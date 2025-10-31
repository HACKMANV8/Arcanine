'use client';

import { motion } from 'framer-motion';
import { Upload, Camera, Image } from 'lucide-react';
import { useState } from 'react';

export function UploadSection() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Mock upload
      alert('Image uploaded! (Mock - no actual upload)');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock upload
      alert('Image uploaded! (Mock - no actual upload)');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Detect Plant Diseases Instantly
        </h2>
        <p className="text-primary-light text-lg mb-8">
          Upload a photo of your plant and get AI-powered diagnosis within seconds
        </p>

        {/* Drag and drop area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
            dragActive
              ? 'border-white bg-white bg-opacity-10 scale-105'
              : 'border-primary-light hover:border-white'
          }`}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-primary-light" />
          <h3 className="text-xl font-semibold mb-2">Drop your image here</h3>
          <p className="text-primary-light mb-6">or click to browse</p>

          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label
              htmlFor="file-upload"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-200 cursor-pointer"
            >
              <Image className="w-5 h-5" />
              Choose File
            </label>
            <button
              onClick={() => alert('Camera feature (Mock)')}
              className="inline-flex items-center justify-center gap-2 bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-30 transition-all duration-200"
            >
              <Camera className="w-5 h-5" />
              Use Camera
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
