'use client';

import { motion } from 'framer-motion';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('plantcare_authenticated');
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Settings', description: 'Update your personal information' },
        { icon: Bell, label: 'Notifications', description: 'Manage alerts and reminders' },
        { icon: Shield, label: 'Privacy & Security', description: 'Control your data and security' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', description: 'Get answers to common questions' },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-darker mb-2">
          Settings
        </h1>
        <p className="text-lg text-neutral-muted">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
          >
            <h2 className="text-lg font-semibold text-neutral-darker mb-4">
              {section.title}
            </h2>
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between p-5 hover:bg-neutral-light transition-all duration-200 ${
                      index !== section.items.length - 1 ? 'border-b border-neutral' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-neutral-darker">{item.label}</p>
                        <p className="text-sm text-neutral-muted">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-muted" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft overflow-hidden"
        >
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 p-5 hover:bg-red-50 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-red-600">Sign Out</p>
              <p className="text-sm text-neutral-muted">Log out of your account</p>
            </div>
          </button>
        </motion.div>

        {/* App Info */}
        <div className="text-center text-sm text-neutral-muted py-6">
          <p>PlantCare AI v1.0</p>
          <p className="mt-1">Built with Next.js & TypeScript</p>
        </div>
      </div>
    </div>
  );
}
