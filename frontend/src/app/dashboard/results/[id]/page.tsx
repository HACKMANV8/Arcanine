'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Download, CheckCircle, AlertCircle, AudioLines, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Diagnosis {
  id: string;
  plantName: string;
  disease: string;
  confidence: number;
  severity: string;
  imageUrl: string;
  detectedAt: string;
  status: 'healthy' | 'needs-attention';
  treatment: {
    immediate: string[];
    longTerm: string[];
    prevention: string[];
  };
  description: string;
}

export default function ResultsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'treatment' | 'prevention' | 'contact'>('diagnosis');
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch plant details from backend
  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        const mobile = '8431036155'; // This should come from the authenticated user
        const plantId = params.id;
        
        // Fetch specific plant details
        const response = await fetch(`http://localhost:8000/transcript/plant/${mobile}/${plantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch plant details');
        }
        
        const data = await response.json();
        console.log('Plant details:', data);
        
        // Transform the data to match our Diagnosis interface
        const transformedData: Diagnosis = {
          id: data.id || '',
          plantName: data.plantName || 'Unknown Plant',
          disease: data.disease || 'Unknown Disease',
          confidence: data.confidence || 0,
          severity: data.severity || 'Unknown',
          // Fix image URL to be web-accessible
          imageUrl: data.imageUrl ? `http://localhost:8000/uploads/${data.imageUrl.split('/').pop()}` : 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
          detectedAt: data.detectedAt || new Date().toISOString(),
          status: data.confidence >= 80 ? 'healthy' : 'needs-attention',
          treatment: {
            immediate: data.treatment?.immediate || [],
            longTerm: data.treatment?.longTerm || [],
            prevention: data.treatment?.prevention || [],
          },
          description: data.description || 'No description available',
        };
        
        setDiagnosis(transformedData);
      } catch (err) {
        console.error('Error fetching plant details:', err);
        setError('Failed to load plant details');
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchPlantDetails();
    }
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-light flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading plant details...</span>
      </div>
    );
  }
  
  if (error || !diagnosis) {
    return (
      <div className="min-h-screen bg-neutral-light flex justify-center items-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-soft">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-700 mb-4">{error || 'Plant details not found'}</p>
          <Link 
            href="/dashboard/plants"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors inline-block"
          >
            Back to Plants
          </Link>
        </div>
      </div>
    );
  }
  
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
                  <AudioLines className="w-4 h-4" />
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
                  <AudioLines className="w-4 h-4" />
                </button>
                    <div>
                      <h3 className="font-semibold text-neutral-darker mb-3">Immediate Actions</h3>
                      <ul className="space-y-2">
                        {diagnosis.treatment.immediate.length > 0 ? (
                          diagnosis.treatment.immediate.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-dark">{step}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-neutral-muted">No immediate actions recommended</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-darker mb-3">Long-term Care</h3>
                      <ul className="space-y-2">
                        {diagnosis.treatment.longTerm.length > 0 ? (
                          diagnosis.treatment.longTerm.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-dark">{step}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-neutral-muted">No long-term care recommendations</li>
                        )}
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
                  <AudioLines className="w-4 h-4" />
                </button>
                    <ul className="space-y-2">
                      {diagnosis.treatment.prevention.length > 0 ? (
                        diagnosis.treatment.prevention.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-dark">{step}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-neutral-muted">No prevention measures recommended</li>
                      )}
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
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-darker mb-2">Contact an Expert</h3>
                      <p className="text-neutral-muted">
                        For plants with confidence below 75%, we recommend consulting with a local nursery expert.
                      </p>
                    </div>
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
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-2"
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