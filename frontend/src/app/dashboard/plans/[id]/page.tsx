'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Circle, CircleChevronDown, CircleChevronUp, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  type: string;
  description?: string;
}

interface Day {
  day: number;
  date: string;
  status: 'completed' | 'today' | 'upcoming';
  tasks: Task[];
  notes: string;
}

interface Plan {
  plantId: string;
  plantName: string;
  disease: string;
  startDate: string;
  progress: number;
  days: Day[];
}

export default function PlansPage() {
  const params = useParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch 7-day plan data from backend
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        const mobile = '8431036155'; // This should come from the authenticated user
        const plantId = params.id;
        
        // Fetch 7-day plan for the specific plant
        const response = await fetch(`http://localhost:8000/transcript/get_sevday_plan/${mobile}/${plantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch 7-day plan');
        }
        
        const data = await response.json();
        console.log('7-day plan data:', data);
        
        // Transform the data to match our Plan interface
        // Since we don't know the exact structure, we'll need to parse the sdayres field
        if (data.sdayres) {
          try {
            // Try to parse as JSON if it's a string
            let planData;
            if (typeof data.sdayres === 'string') {
              // Try to parse as JSON
              try {
                planData = JSON.parse(data.sdayres);
              } catch (e) {
                // If it's not valid JSON, treat it as a string
                planData = data.sdayres;
              }
            } else {
              planData = data.sdayres;
            }
            
            // If planData is an array, transform it to match our interface
            if (Array.isArray(planData)) {
              const transformedPlan: Plan = {
                plantId: data.plant_id || plantId as string || '',
                plantName: 'Plant Care Plan',
                disease: 'Care Schedule',
                startDate: new Date().toISOString(),
                progress: 0,
                days: planData.map((day: any, index: number) => ({
                  day: day.day || index + 1,
                  date: day.date || new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                  status: day.status || (index === 0 ? 'today' : index < 3 ? 'completed' : 'upcoming'),
                  tasks: day.tasks || [{
                    id: `${index}-task-1`,
                    title: day.title || day.name || `Task for Day ${index + 1}`,
                    completed: day.completed || false,
                    type: day.type || 'care',
                    description: day.description || day.notes || ''
                  }],
                  notes: day.notes || ''
                }))
              };
              
              setPlan(transformedPlan);
            } else {
              // Handle object format
              const transformedPlan: Plan = {
                plantId: data.plant_id || plantId as string || '',
                plantName: planData.plantName || 'Plant Care Plan',
                disease: planData.disease || 'Care Schedule',
                startDate: planData.startDate || new Date().toISOString(),
                progress: planData.progress || 0,
                days: planData.days || []
              };
              
              setPlan(transformedPlan);
            }
          } catch (parseError) {
            console.error('Error parsing plan data:', parseError);
            // Fallback to simple parsing
            const transformedPlan: Plan = {
              plantId: data.plant_id || plantId as string || '',
              plantName: 'Plant Care Plan',
              disease: 'Care Schedule',
              startDate: new Date().toISOString(),
              progress: 0,
              days: [{
                day: 1,
                date: new Date().toISOString().split('T')[0],
                status: 'today',
                tasks: [{
                  id: 'task-1',
                  title: typeof data.sdayres === 'string' ? data.sdayres : 'Care Task',
                  completed: false,
                  type: 'care',
                  description: ''
                }],
                notes: ''
              }]
            };
            
            setPlan(transformedPlan);
          }
        } else {
          setError('No plan data available');
        }
      } catch (err) {
        console.error('Error fetching 7-day plan:', err);
        setError('Failed to load 7-day plan: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchPlan();
    }
  }, [params.id]);
  
  const completedDays = useMemo(() => {
    if (!plan) return 0;
    return plan.days.filter(d => d.status === 'completed').length;
  }, [plan]);
  
  const progress = useMemo(() => {
    if (!plan) return 0;
    const totalTasks = plan.days.reduce((acc, day) => acc + day.tasks.length, 0);
    const completedTasks = plan.days.reduce((acc, day) => acc + day.tasks.filter(t => t.completed).length, 0);
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }, [plan]);

  const handleTaskClick = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleTaskCompletion = (dayIndex: number, taskId: string) => {
    if (!plan) return;
    const newPlan = { ...plan };
    const task = newPlan.days[dayIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setPlan(newPlan);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-light flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading 7-day plan...</span>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-neutral-light flex justify-center items-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-soft">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-700 mb-4">{error || '7-day plan not found'}</p>
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

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/plants" className="flex items-center gap-2 text-neutral-muted hover:text-primary transition-colors duration-200">
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
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-neutral-light rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
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
          {plan.days.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
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
                    className="rounded-lg hover:bg-neutral-light transition-colors duration-200 cursor-pointer"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex items-start gap-3 p-3">
                      <div onClick={(e) => { e.stopPropagation(); handleTaskCompletion(dayIndex, task.id); }}>
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-neutral-muted flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`${
                          task.completed
                            ? 'text-neutral-muted '
                            : 'text-neutral-dark font-medium'
                        }`}>
                          {task.title}
                        </p>
                      </div>
                      {expandedTask === task.id ? <CircleChevronUp /> : <CircleChevronDown />}
                    </div>
                    <AnimatePresence>
                      {expandedTask === task.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-3 pb-3"
                        >
                          <span className="text-xs text-neutral-muted capitalize">
                            {task.description}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
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