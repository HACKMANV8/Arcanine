'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Clock, Loader2, Leaf, Calendar } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  species: string;
  status: 'healthy' | 'needs-attention';
  lastChecked: string;
  health: number;
  imageUrl: string;
  location: string;
  notes: string;
}

export default function PlantsPage() {
  const [filter, setFilter] = useState<'all' | 'healthy' | 'needs-attention'>('all');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch plants data from backend
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        const mobile = '8431036155'; // This should come from the authenticated user
        
        // Fetch all plants for the user
        const response = await fetch(`http://localhost:8000/transcript/plant/${mobile}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch plants data');
        }
        
        const data = await response.json();
        console.log('Plants data:', data);
        
        // Transform the data to match our Plant interface
        const transformedPlants = data.plants.map((plant: any) => ({
          id: plant.id || '',
          name: plant.plantName || 'Unknown Plant',
          species: plant.disease || 'Unknown Species',
          status: plant.confidence >= 80 ? 'healthy' : 'needs-attention',
          lastChecked: new Date(plant.detectedAt || new Date()).toLocaleDateString(),
          health: plant.confidence || 0,
          // Fix image URL to be web-accessible
          imageUrl: plant.imageUrl ? `http://localhost:8000/uploads/${plant.imageUrl.split('/').pop()}` : 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
          location: 'Garden', // This could come from user data
          notes: plant.description || 'No additional notes',
        }));
        
        setPlants(transformedPlants);
      } catch (err) {
        console.error('Error fetching plants:', err);
        setError('Failed to load plants data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlants();
  }, []);
  
  const filteredPlants = plants.filter((plant) => {
    if (filter === 'all') return true;
    return plant.status === filter;
  });

  const statusConfig = {
    healthy: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    'needs-attention': {
      icon: AlertCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading your plants...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-darker mb-2">
          My Plants
        </h1>
        <p className="text-lg text-neutral-muted">
          Track and manage your plant collection
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-3 mb-8 overflow-x-auto pb-2"
      >
        {[
          { value: 'all', label: 'All Plants', count: plants.length },
          { value: 'healthy', label: 'Healthy', count: plants.filter((p) => p.status === 'healthy').length },
          { value: 'needs-attention', label: 'Needs Attention', count: plants.filter((p) => p.status === 'needs-attention').length },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value as typeof filter)}
            className={`px-6 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
              filter === f.value
                ? 'bg-primary text-white shadow-soft'
                : 'bg-white text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </motion.div>

      {/* Plants Grid */}
      {plants.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-soft">
          <div className="mx-auto w-16 h-16 bg-neutral-light rounded-full flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-neutral-muted" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-darker mb-2">No Plants Found</h3>
          <p className="text-neutral-muted mb-4">You haven't added any plants yet.</p>
          <Link href="/dashboard" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Add Your First Plant
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant, index) => {
            const config = statusConfig[plant.status];
            const Icon = config.icon;

            return (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-200 group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className={`absolute top-3 right-3 ${config.bg} ${config.border} border px-3 py-2 rounded-full flex items-center gap-2`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>
                        {plant.health}%
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-neutral-darker mb-1">
                      {plant.name}
                    </h3>
                    <p className="text-sm text-neutral-muted mb-3 italic">
                      {plant.species}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-dark">
                        <Clock className="w-4 h-4 text-neutral-muted" />
                        <span>Last checked: {plant.lastChecked}</span>
                      </div>
                      <p className="text-sm text-neutral-muted">
                        📍 {plant.location}
                      </p>
                    </div>

                    {plant.notes && (
                      <div className="bg-neutral-light rounded-lg p-3 mb-4">
                        <p className="text-sm text-neutral-dark">{plant.notes}</p>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link 
                        href={`/dashboard/results/${plant.id}`}
                        className="flex-1 bg-white border border-neutral text-neutral-darker font-medium py-2 rounded-lg text-center hover:bg-neutral-light transition-colors"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/dashboard/plans/${plant.id}`}
                        className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-3 rounded-lg transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>7-Day Plan</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}