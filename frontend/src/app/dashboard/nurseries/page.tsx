'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Navigation, Loader2, AlertCircle } from 'lucide-react';

interface Nursery {
  name: string;
  rating?: number;
  reviewCount?: number;
  distance?: string;
  status?: string;
  closes?: string;
  type?: string;
  address?: string;
  phone?: string;
  specialties?: string[];
  imageUrl?: string;
  opening_status?: string;
}

export default function NurseriesPage() {
  const [nurseries, setNurseries] = useState<Nursery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const mobile = '8431036155';
        
        const response = await fetch(`http://localhost:8000/transcript/getnurseries/${mobile}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch nurseries data');
        }
        
        const data = await response.json();
        console.log('Nurseries data:', data);
        
        // Transform the data to match our Nursery interface
        const transformedNurseries = data.map((nursery: any) => ({
          name: nursery.name || 'Unknown Nursery',
          rating: nursery.rating || 0,
          reviewCount: 0, // Not provided in API response
          distance: 'Nearby', // Not provided in API response
          status: nursery.opening_status || 'Unknown',
          closes: 'Unknown', // Not provided in API response
          type: nursery.type || 'Nursery',
          address: nursery.address || 'Address not available',
          phone: nursery.phone || 'Phone not available',
          specialties: nursery.specialties || [],
          imageUrl: nursery.imageUrl || '',
          opening_status: nursery.opening_status || 'Unknown',
        }));
        
        setNurseries(transformedNurseries);
      } catch (err) {
        console.error('Error fetching nurseries:', err);
        setError('Failed to load nurseries data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNurseries();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading nurseries...</span>
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
          Nearby Nurseries
        </h1>
        <p className="text-lg text-neutral-muted">
          Find expert help and supplies near you
        </p>
      </motion.div>

      {/* Nurseries List */}
      {nurseries.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-soft">
          <div className="mx-auto w-16 h-16 bg-neutral-light rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-neutral-muted" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-darker mb-2">No Nurseries Found</h3>
          <p className="text-neutral-muted">No nearby nurseries available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {nurseries.map((nursery, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row">
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-darker mb-2">
                        {nursery.name}
                      </h2>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="font-semibold text-neutral-darker">{nursery.rating}</span>
                          {nursery.reviewCount && (
                            <span className="text-sm text-neutral-muted">({nursery.reviewCount})</span>
                          )}
                        </div>
                        
                      </div>
                    </div>
                    <span className="inline-block mt-2 md:mt-0 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {nursery.type}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-neutral-muted mt-1 flex-shrink-0" />
                      <span className="text-sm text-neutral-dark">{nursery.address}</span>
                    </div>
                    {/* {nursery.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-neutral-muted mt-1 flex-shrink-0" />
                        <span className="text-sm text-neutral-dark">{nursery.phone}</span>
                      </div>
                    )} */}
                  </div>

                  {/* Specialties */}
                  {nursery.specialties && nursery.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {nursery.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-neutral-light text-neutral-dark px-3 py-1 rounded-lg text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a href={`${nursery.address}`} target="_blank">
                    <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                      
                        <Navigation className="w-4 h-4" />
                        Get Directions
                      
                    </button>
                    </a>
                    {nursery.phone && (
                      <button className="px-6 bg-neutral-light hover:bg-neutral text-neutral-darker font-medium py-2.5 rounded-xl transition-all duration-200">
                        Call
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}