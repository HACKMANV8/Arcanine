'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Download, CheckCircle, AlertCircle, Mic } from 'lucide-react';
import Link from 'next/link';
import { mockDiagnoses, mockNurseries } from '@/lib/mock-data';
import { useParams } from 'next/navigation';

export default function ResultsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'treatment' | 'prevention' | 'contact'>('diagnosis');
  
  const diagnosis = mockDiagnoses.find(d => d.id === params.id) || mockDiagnoses[0];
  const showContact = diagnosis.confidence < 75;

  const statusConfig = {
    healthy: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    'needs-attention': { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  };

  const config = statusConfig[diagnosis.status] || statusConfig['needs-attention'];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/plants" className="flex items-center gap-2 text-neutral-muted hover:text-primary transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-neutral-light rounded-lg transition-colors duration-200">
              <Share2 className="w-5 h-5 text-neutral-muted" />
            </button>
            <button className="p-2 hover:bg-neutral-light rounded-lg transition-colors duration-200">
              <Download className="w-5 h-5 text-neutral-muted" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft"
            >
              <img
                src={diagnosis.imageUrl}
                alt={diagnosis.plantName}
                className="w-full h-96 object-cover"
              />
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between mb-6 border-b border-neutral pb-4">
                <div className="flex gap-2">
                  {(['diagnosis', 'treatment', 'prevention'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 capitalize ${
                        activeTab === tab
                          ? 'bg-primary text-white shadow-soft'
                          : 'text-neutral-muted hover:text-neutral-dark hover:bg-neutral-light'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  {showContact && (
                    <button
                      onClick={() => setActiveTab('contact')}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 capitalize ${
                        activeTab === 'contact'
                          ? 'bg-primary text-white shadow-soft'
                          : 'text-neutral-muted hover:text-neutral-dark hover:bg-neutral-light'
                      }`}
                    >
                      contact expert
                    </button>
                  )}
                </div>  
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === 'diagnosis' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                  type="button"
                  className="inline-flex mb-4 items-center gap-2 px-3 py-2 rounded-lg border border-neutral text-neutral-darker hover:bg-neutral-light"
                  onClick={() => alert('Voice (Mock)')}
                  aria-label="Voice"
                >
                  <Mic className="w-4 h-4" />
                </button>
                    <p className="text-neutral-dark leading-relaxed">
                      {diagnosis.description}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'treatment' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral text-neutral-darker hover:bg-neutral-light"
                  onClick={() => alert('Voice (Mock)')}
                  aria-label="Voice"
                >
                  <Mic className="w-4 h-4" />
                </button>
                    <div>
                      <h3 className="font-semibold text-neutral-darker mb-3">Immediate Actions</h3>
                      <ul className="space-y-2">
                        {diagnosis.treatment.immediate.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-dark">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-darker mb-3">Long-term Care</h3>
                      <ul className="space-y-2">
                        {diagnosis.treatment.longTerm.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-dark">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'prevention' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                  type="button"
                  className="inline-flex mb-3 items-center gap-2 px-3 py-2 rounded-lg border border-neutral text-neutral-darker hover:bg-neutral-light"
                  onClick={() => alert('Voice (Mock)')}
                  aria-label="Voice"
                >
                  <Mic className="w-4 h-4" />
                </button>
                    <ul className="space-y-2">
                      {diagnosis.treatment.prevention.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-dark">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'contact' && showContact && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {mockNurseries.slice(0, 4).map((n) => (
                      <div key={n.id} className="flex items-center justify-between p-4 rounded-xl border border-neutral">
                        <div>
                          <div className="font-semibold text-neutral-darker">{n.name}</div>
                          <div className="text-sm text-neutral-muted">{n.address}</div>
                        </div>
                        <a href={`tel:${n.phone}`} className="text-primary font-medium hover:underline">{n.phone}</a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Diagnosis Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-soft p-6 lg:sticky lg:top-24"
            >
              <div className={`${config.bg} rounded-xl p-4 mb-6 flex items-center gap-3`}>
                <Icon className={`w-8 h-8 ${config.color}`} />
                <div>
                  <p className="text-sm text-neutral-muted">Confidence</p>
                  <p className={`text-2xl font-bold ${config.color}`}>{diagnosis.confidence}%</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-neutral-darker mb-2">
                {diagnosis.plantName}
              </h2>
              <p className={`text-lg font-medium ${config.color} mb-6`}>
                {diagnosis.disease}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-neutral-muted mb-1">Severity</p>
                  <p className="font-semibold text-neutral-darker">{diagnosis.severity}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-muted mb-1">Detected On</p>
                  <p className="font-semibold text-neutral-darker">
                    {new Date(diagnosis.detectedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/dashboard/plans"
                  className="block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  View 7-Day Plan
                </Link>
                <Link
                  href="/dashboard/chat"
                  className="block w-full bg-neutral-light hover:bg-neutral text-neutral-darker font-medium py-3 rounded-xl text-center transition-all duration-200"
                >
                  Ask AI Assistant
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
