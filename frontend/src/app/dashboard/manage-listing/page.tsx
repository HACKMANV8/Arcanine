'use client';

import { useState, useMemo } from 'react';
import { mockMarketplaceProducts, mockUser } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Edit, Save, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ManageListingsPage() {
  // Assuming the current user is 'John Doe' for mock purposes
  const currentUserFarmer = 'John Doe'; 
  const [products, setProducts] = useState(mockMarketplaceProducts.filter(p => p.farmer.name === currentUserFarmer));
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedUnit, setUpdatedUnit] = useState('');

  const handleRemove = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateClick = (product) => {
    setEditingProduct(product.id);
    setUpdatedPrice(product.price);
    setUpdatedQuantity(product.quantity.split(' ')[0]);
    setUpdatedUnit(product.unit);
  };

  const handleCancelUpdate = () => {
    setEditingProduct(null);
  };

  const handleSaveUpdate = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, price: updatedPrice, quantity: `${updatedQuantity} ${updatedUnit} available`, unit: updatedUnit } : p
    ));
    setEditingProduct(null);
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

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-darker mb-6">Manage Your Listings</h1>

          {products.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-xl shadow-soft">
              <h2 className="text-xl font-semibold text-neutral-darker mb-2">No Active Listings</h2>
              <p className="text-neutral-muted">You have not listed any products yet. Go to the marketplace to list your produce.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-soft p-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-grow">
                      <h3 className="font-bold text-neutral-darker">{product.name}</h3>
                      {editingProduct === product.id ? (
                        <div className="flex items-center gap-2 mt-2">
                          <input type="text" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} className="w-24 p-1 border rounded" />
                          <input type="text" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)} className="w-24 p-1 border rounded" />
                          <input type="text" value={updatedUnit} onChange={(e) => setUpdatedUnit(e.target.value)} className="w-24 p-1 border rounded" />
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-neutral-muted">Price: <span className="font-semibold text-primary">${product.price}</span> / {product.unit}</p>
                          <p className="text-sm text-neutral-muted">Quantity: {product.quantity}</p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {editingProduct === product.id ? (
                        <>
                          <button onClick={() => handleSaveUpdate(product.id)} className="p-2 text-green-600 hover:bg-green-100 rounded-full"><Save className="w-5 h-5" /></button>
                          <button onClick={handleCancelUpdate} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><XCircle className="w-5 h-5" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleUpdateClick(product)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleRemove(product.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 className="w-5 h-5" /></button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
