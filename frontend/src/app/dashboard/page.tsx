'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Calendar, MessageCircle, MapPin, Camera, Upload, Activity, UserRound } from 'lucide-react';
import Link from 'next/link';
import { DiagnosisCard } from '@/components/shared/DiagnosisCard';
import { mockDiagnoses, mockUser, mockUserPlants } from '@/lib/mock-data';
// import { useState } from "react";
import axios from "axios";
import { link } from 'fs';
import { useRouter } from 'next/navigation';
// import axios from "axios";

export default function DashboardPage() {
  const router=useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [uploading, setUploading] = useState(false);
  const recentDiagnoses = mockDiagnoses.slice(0, 4);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userData, setUserData] = useState(null);
  const [results, setResults] = useState([]);
  const [token, setToken] = useState<string | null>(null);

  // const token = localStorage.getItem("token");

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(e.target.files)) ,onFilesSelected(e.target.files);
  };
  
  // useEffect(() => {
  //   // ✅ Runs only on client
  //   const storedToken = localStorage.getItem("token");
  //   console.log(storedToken)
  //   setToken(storedToken);

  //   if (storedToken) {
  //     fetchUserData(storedToken);
  //   }
  // }, []);

  // const fetchUserData = async (token: string) => {
  //   try {
  //     const res = await axios.get("http://127.0.0.1:8000/transcript/dashboard", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("data"+res.data)
  //     setUserData(res.data);
  //     console.log("User Data:", res.data);
  //   } catch (error) {
  //     console.error("Error fetching dashboard:", error);
  //   }
  // };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      setUploading(true);
      const res = await axios.post("http://127.0.0.1:8000/transcript/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", res.data);
      setResults(res.data.results);
      router.push('/dashboard/results/1');
      // alert("✅ Uploaded successfully!");
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Error uploading files.");
    } finally {
      setUploading(false);
    }
  };
  const quickActions = [
    { title: 'Find Nursery', description: 'Nearby help', href: '/dashboard/nurseries', icon: MapPin },
    { title: 'Ask Expert', description: 'Chat with AI', href: '/dashboard/chat', icon: MessageCircle },
    { title: 'My Plants', description: 'Manage collection', href: '/dashboard/plants', icon: Calendar },
    { title: 'Settings', description: 'Personalize app', href: '/dashboard/settings', icon: Activity },
  ];

  const stats = useMemo(() => {
    const total = mockUserPlants.length;
    const healthy = mockUserPlants.filter(p => p.status === 'healthy').length;
    const critical = mockUserPlants.filter(p => p.status === 'needs-attention').length;
    return { total, healthy, critical };
  }, []);

  const onFilesSelected = (incoming: FileList | File[]) => {
    const incomingArray = Array.from(incoming);
    const combined = [...files, ...incomingArray].slice(0, 15);
    setFiles(combined);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  

  const previews = useMemo(() => files.map(file => ({
    url: URL.createObjectURL(file),
    name: file.name,
  })), [files]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Header (kept minimal; actual top bar is in layout nav) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-darker">
          Welcome back, {mockUser.name.split(' ')[0]}!
        </h1>
      </motion.div>

      {/* Hero + Quick Stats (desktop two-column) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Hero Upload (spans 2 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-5 md:p-8 border border-primary/20"
        >
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-darker mb-2">Diagnose Your Plant</h2>
            <p className="text-neutral-muted">Upload images for AI-powered diagnosis. Up to 15 images.</p>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 bg-white ${dragActive ? 'border-primary bg-opacity-90' : 'border-primary/40 hover:border-primary'}`}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-1">Drop images here</h3>
            <p className="text-neutral-muted mb-4">or click to upload (up to 15)</p>
            <input
              type="file"
              id="hero-upload"
              accept="image/*"
              multiple
              onChange={handleInput}
              className="hidden"
            />
            <label
              htmlFor="hero-upload"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Choose Images
            </label>
          </div>

          {/* Thumbnails */}
          {previews.length > 0 && (
            <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {previews.map((p, i) => (
                <div key={p.url} className="relative rounded-lg overflow-hidden bg-neutral-light border border-neutral">
                  <img src={p.url} alt={p.name} className="h-20 w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
        onClick={handleUpload}
        disabled={uploading}
        className="inline-flex items-center justify-center gap-2 bg-white text-neutral-darker px-5 py-3 rounded-xl font-medium border border-neutral hover:bg-neutral-light transition-colors"
      >
        <Camera className="w-5 h-5" />
        {uploading ? "Uploading..." : "Generate Diagnosis"}
      </button>
            <Link
              href="/dashboard/chat"
              className="inline-flex items-center justify-center gap-2 bg-white text-neutral-darker px-5 py-3 rounded-xl font-medium border border-neutral hover:bg-neutral-light transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> Describe Symptoms
            </Link>
          </div>
        </motion.div>

        {/* Quick Stats (desktop only visually, but shown on mobile stacked) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-5 md:p-6 border border-neutral shadow-sm"
        >
          <h3 className="text-lg font-semibold text-neutral-darker mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-light">
              <span className="text-neutral-muted">Total Plants</span>
              <span className="font-semibold text-neutral-darker">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100">
              <span className="text-green-700">Healthy</span>
              <span className="font-semibold text-green-700">{stats.healthy}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-amber-700">Needs Attention</span>
              <span className="font-semibold text-amber-700">{stats.critical}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Diagnoses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-darker">Recent Diagnoses</h2>
          <Link href="/dashboard/plants" className="text-primary font-medium inline-flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {recentDiagnoses.map((diagnosis, index) => (
            <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-neutral-darker mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon as any;
            return (
              <Link key={action.title} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="bg-white rounded-xl p-5 border border-neutral hover:border-neutral-dark shadow-sm hover:shadow-soft transition-all"
                >
                  <Icon className="w-8 h-8 mb-3 text-primary" />
                  <div className="font-semibold text-neutral-darker">{action.title}</div>
                  <div className="text-sm text-neutral-muted">{action.description}</div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* FAB */}
      <Link href="#">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full shadow-soft-lg flex items-center justify-center text-white hover:bg-primary-dark transition-all z-40"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Camera className="w-6 h-6" />
        </motion.button>
      </Link>
    </div>
  );
}
