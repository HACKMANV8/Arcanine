'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Plus, ShoppingCart, Store, Tag, Star, Search, Filter, X, Phone, Mail } from 'lucide-react';
import { mockMarketplaceProducts } from '@/lib/mock-data';

export default function MarketplacePage() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const handleCardClick = (product) => {
    setExpandedCard(product);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  const filteredProducts = useMemo(() => {
    let products = mockMarketplaceProducts;

    if (searchQuery) {
      products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (filterBy !== 'all') {
      products = products.filter(p => p.seller === filterBy);
    }

    return products;
  }, [searchQuery, filterBy]);

  return (
    <LayoutGroup>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-darker mb-2">
              Marketplace
            </h1>
            <p className="text-lg text-neutral-muted">
              Buy and sell fresh produce from local farmers
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <Link href="/dashboard/list-produce">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-soft hover:shadow-soft-lg w-full md:w-auto"
              >
                <Plus className="w-5 h-5" />
                List Your Produce
              </motion.button>
            </Link>
            <Link href="/dashboard/manage-listing">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-primary px-5 py-3 rounded-xl font-medium hover:bg-primary-lightest hover:bg-primary-light transition-colors shadow-soft hover:shadow-soft-lg w-full md:w-auto"
              >
                Manage Listings
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-12 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select 
              className="inline-flex items-center justify-center gap-2 bg-white text-neutral-darker px-5 py-3 rounded-xl font-medium border border-neutral hover:bg-neutral-light transition-colors appearance-none pr-10 w-full md:w-auto"
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Sellers</option>
              <option value="Green Thumb Garden">Green Thumb Garden</option>
              <option value="Urban Plant Nursery">Urban Plant Nursery</option>
              <option value="Sunset Garden Shop">Sunset Garden Shop</option>
              <option value="Organic Gardens Supply">Organic Gardens Supply</option>
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-muted" />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              layoutId={`card-container-${product.id}`}
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-200 group flex overflow-hidden"
              onClick={() => handleCardClick(product)}
            >
              {/* Image */}
              <motion.div layoutId={`card-image-${product.id}`} className="relative w-1/3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </motion.div>

              {/* Content */}
              <div className="p-5 w-2/3 flex flex-col justify-between">
                <div>
                  <motion.h3 layoutId={`card-name-${product.id}`} className="text-lg font-bold text-neutral-darker mb-2">{product.name}</motion.h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-muted">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <motion.span layoutId={`card-price-${product.id}`} className="font-semibold text-primary text-xl">{product.price}</motion.span>
                    <span className="text-sm text-neutral-muted">{product.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-muted mb-4">
                    <Store className="w-4 h-4" />
                    <span>{product.farmer.name}</span>
                  </div>
                  <p className="text-sm text-gray-500">{product.quantity}</p>
                </div>
                <motion.button 
                  layoutId={`card-button-${product.id}`}
                  className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2">
                  Buy Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {expandedCard && (
            <motion.div
              layoutId={`card-container-${expandedCard.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={handleClose}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-soft-lg p-8 max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={handleClose} className="absolute top-4 right-4 text-neutral-muted hover:text-neutral-dark">
                  <X className="w-6 h-6" />
                </button>
                <div className="flex gap-8">
                  <div className="w-1/2">
                    <motion.div layoutId={`card-image-${expandedCard.id}`}>
                      <img src={expandedCard.imageUrl} alt={expandedCard.name} className="w-full h-auto rounded-lg" />
                    </motion.div>
                    <div className="my-4">
                      <h3 className="text-md font-semibold text-neutral-darker mb-1">Severity</h3>
                      <p className="text-lg font-bold text-amber-500">{expandedCard.severity}</p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <motion.h2 layoutId={`card-name-${expandedCard.id}`} className="text-2xl font-bold text-neutral-darker mb-2">{expandedCard.name}</motion.h2>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(expandedCard.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-muted">({expandedCard.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <motion.span layoutId={`card-price-${expandedCard.id}`} className="font-semibold text-primary text-2xl">{expandedCard.price}</motion.span>
                      <span className="text-sm text-neutral-muted">{expandedCard.unit}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{expandedCard.quantity}</p>

                    <div className="my-6">
                      <h3 className="text-lg font-semibold text-neutral-darker mb-2">Severity Progress</h3>
                      <div className="w-full h-20 bg-neutral-light rounded-lg flex items-center justify-center">
                        <p className="text-neutral-muted">Mock Progress Chart</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-darker mb-2">Contact Farmer</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-neutral-muted" />
                        <span>{expandedCard.farmer.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-neutral-muted" />
                        <span>{expandedCard.farmer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-neutral-muted" />
                        <span>{expandedCard.farmer.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
