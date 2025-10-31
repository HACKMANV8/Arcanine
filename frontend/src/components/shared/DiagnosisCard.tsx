'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface DiagnosisCardProps {
  diagnosis: {
    id: string;
    plantName: string;
    disease: string;
    confidence: number;
    severity: string;
    imageUrl: string;
    detectedAt: string;
    status: 'healthy' | 'needs-attention' | 'critical';
  };
  index?: number;
}

export function DiagnosisCard({ diagnosis, index = 0 }: DiagnosisCardProps) {
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
    critical: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
  };

  const config = statusConfig[diagnosis.status];
  const Icon = config.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/dashboard/results/${diagnosis.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-200 group">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={diagnosis.imageUrl}
              alt={diagnosis.plantName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className={`absolute top-3 right-3 ${config.bg} ${config.border} border px-3 py-1 rounded-full flex items-center gap-1`}>
              <Icon className={`w-4 h-4 ${config.color}`} />
              <span className={`text-sm font-medium ${config.color}`}>
                {diagnosis.confidence}%
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-neutral-darker mb-1">
              {diagnosis.plantName}
            </h3>
            <p className={`text-sm font-medium mb-3 ${config.color}`}>
              {diagnosis.disease}
            </p>
            
            <div className="flex items-center justify-between text-sm text-neutral-muted">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(diagnosis.detectedAt)}</span>
              </div>
              <span className="text-neutral-dark font-medium">
                {diagnosis.severity} Severity
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
