'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';
import { mock7DayPlan } from '@/lib/mock-data';

export default function PlansPage() {
  const plan = mock7DayPlan;
  const completedDays = plan.days.filter(d => d.status === 'completed').length;

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-neutral-muted hover:text-primary transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Plan Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-soft p-6 mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-darker mb-2">
            7-Day Care Plan
          </h1>
          <p className="text-lg text-neutral-muted mb-4">
            {plan.plantName} - {plan.disease}
          </p>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-neutral-muted">Progress</span>
              <span className="font-semibold text-primary">{plan.progress}%</span>
            </div>
            <div className="w-full h-3 bg-neutral-light rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${plan.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
              />
            </div>
            <p className="text-sm text-neutral-muted mt-2">
              {completedDays} of 7 days completed
            </p>
          </div>
        </motion.div>

        {/* Days */}
        <div className="space-y-4">
          {plan.days.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-soft p-6 ${
                day.status === 'today' ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  day.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : day.status === 'today'
                    ? 'bg-primary text-white'
                    : 'bg-neutral-light text-neutral-muted'
                }`}>
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-neutral-darker">
                      Day {day.day}
                    </h3>
                    {day.status === 'today' && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-muted">{day.date}</p>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-light transition-colors duration-200"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-muted flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`${
                        task.completed
                          ? 'text-neutral-muted '
                          : 'text-neutral-dark font-medium'
                      }`}>
                        {task.title}
                      </p>
                      <span className="text-xs text-neutral-muted capitalize">
                        {task.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {day.notes && (
                <div className="mt-4 bg-neutral-light rounded-lg p-4">
                  <p className="text-sm font-medium text-neutral-dark mb-1">Notes:</p>
                  <p className="text-sm text-neutral-muted">{day.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
