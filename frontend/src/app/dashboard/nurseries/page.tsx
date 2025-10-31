'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';
import { mockNurseries } from '@/lib/mock-data';

export default function NurseriesPage() {
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
      <div className="space-y-4">
        {mockNurseries.map((nursery, index) => (
          <motion.div
            key={nursery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto">
                <img
                  src={nursery.imageUrl}
                  alt={nursery.name}
                  className="w-full h-full object-cover"
                />
              </div>

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
                        <span className="text-sm text-neutral-muted">({nursery.reviewCount})</span>
                      </div>
                      <span className="text-neutral-muted">•</span>
                      <span className="text-sm text-neutral-muted">{nursery.distance}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${
                        nursery.status === 'Open' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {nursery.status === 'Open' ? '● Open' : '● Closes Soon'}
                      </span>
                      <span className="text-neutral-muted">Closes at {nursery.closes}</span>
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
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-neutral-muted mt-1 flex-shrink-0" />
                    <span className="text-sm text-neutral-dark">{nursery.phone}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {nursery.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-neutral-light text-neutral-dark px-3 py-1 rounded-lg text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                  <button className="px-6 bg-neutral-light hover:bg-neutral text-neutral-darker font-medium py-2.5 rounded-xl transition-all duration-200">
                    Call
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
