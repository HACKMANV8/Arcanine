'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockUserPlants } from '@/lib/mock-data';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function PlantsPage() {
  const [filter, setFilter] = useState<'all' | 'healthy' | 'needs-attention'>('all');

  const filteredPlants = mockUserPlants.filter((plant) => {
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
          { value: 'all', label: 'All Plants', count: mockUserPlants.length },
          { value: 'healthy', label: 'Healthy', count: mockUserPlants.filter((p) => p.status === 'healthy').length },
          { value: 'needs-attention', label: 'Needs Attention', count: mockUserPlants.filter((p) => p.status === 'needs-attention').length },
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
              <Link href={`/dashboard/results/${plant.id}`}>
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
                      <div className="bg-neutral-light rounded-lg p-3">
                        <p className="text-sm text-neutral-dark">{plant.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
