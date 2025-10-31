'use client';

import { useState, useMemo } from 'react';
import { mockUserPlants, mockDiagnoses } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, Hash, FileText, Image } from 'lucide-react';
import Link from 'next/link';

export default function ListProducePage() {
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const listablePlants = useMemo(() => {
    const mediumSeverityDiagnoses = mockDiagnoses.filter(
      (d) => d.severity === 'Medium' || d.severity === 'High'
    );
    const listablePlantNames = mediumSeverityDiagnoses.map((d) => d.plantName);
    return mockUserPlants.filter((p) => listablePlantNames.includes(p.name));
  }, []);

  const selectedPlant = useMemo(() => {
    return mockUserPlants.find(p => p.id === selectedPlantId);
  }, [selectedPlantId]);

  const selectedPlantDiagnosis = useMemo(() => {
    if (!selectedPlant) return null;
    return mockDiagnoses.find(d => d.plantName === selectedPlant.name);
  }, [selectedPlant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlant) {
      alert('Please select a plant to list.');
      return;
    }
    // Handle form submission logic here
    console.log({
      plantId: selectedPlantId,
      plantName: selectedPlant.name,
      price,
      quantity,
      unit,
      description,
      imageUrl,
    });
    alert('Produce listed successfully!');
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/marketplace" className="flex items-center gap-2 text-neutral-muted hover:text-primary transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Marketplace</span>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-darker mb-6">List Your Produce in the Marketplace</h1>

          {listablePlants.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-xl shadow-soft">
              <h2 className="text-xl font-semibold text-neutral-darker mb-2">No Produce to List</h2>
              <p className="text-neutral-muted">You can only list produce from plants that have a medium or higher disease severity. Check your diagnoses and try again later.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-soft space-y-6">
              <div>
                <label htmlFor="plant" className="block text-sm font-medium text-neutral-dark mb-2">Select Plant</label>
                <select
                  id="plant"
                  value={selectedPlantId}
                  onChange={(e) => setSelectedPlantId(e.target.value)}
                  className="w-full p-3 bg-neutral-light border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="" disabled>Choose a plant...</option>
                  {listablePlants.map(plant => (
                    <option key={plant.id} value={plant.id}>{plant.name}</option>
                  ))}
                </select>
              </div>

              {selectedPlant && (
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary-lightest">
                  <img src={selectedPlant.imageUrl} alt={selectedPlant.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold text-primary-dark">{selectedPlant.name}</h3>
                    <p className="text-sm text-primary-muted">{selectedPlant.species}</p>
                    {selectedPlantDiagnosis && (
                      <p className="text-sm text-primary-muted font-medium">Severity: <span className="font-bold">{selectedPlantDiagnosis.severity}</span></p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-neutral-dark mb-2">Price</label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 text-neutral-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full p-3 pl-10 bg-neutral-light border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-neutral-dark mb-2">Quantity</label>
                  <div className="relative">
                    <Hash className="w-5 h-5 text-neutral-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="10"
                      className="w-full p-3 pl-10 bg-neutral-light border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-neutral-dark mb-2">Unit</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="e.g., lbs, dozen"
                      className="w-full p-3 bg-neutral-light border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-dark mb-2">Description</label>
                <div className="relative">
                  <FileText className="w-5 h-5 text-neutral-muted absolute left-3 top-4" />
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Add a brief description of your produce..."
                    className="w-full p-3 pl-10 bg-neutral-light border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-dark mb-2">Produce Image</label>
                <div className="relative">
                  <Image className="w-5 h-5 text-neutral-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-3 pl-10 bg-neutral-light border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md disabled:bg-neutral-muted disabled:cursor-not-allowed"
                disabled={!selectedPlantId || !imageUrl || listablePlants.length === 0}
              >
                List Produce
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
