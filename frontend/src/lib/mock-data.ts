// Mock User Data
export const mockUser = {
  id: '1',
  name: 'Sarah Green',
  email: 'sarah@plantcare.ai',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
};

// Mock Credentials
export const mockCredentials = {
  number: '1234567890',
  password: '12345678',
};

// Mock Plant Diagnoses
export const mockDiagnoses = [
  {
    id: '1',
    plantName: 'Tomato Plant',
    disease: 'Early Blight',
    confidence: 92,
    severity: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
    detectedAt: '2025-01-15T10:30:00Z',
    status: 'needs-attention',
    treatment: {
      immediate: ['Remove affected leaves', 'Apply copper-based fungicide'],
      longTerm: ['Improve air circulation', 'Water at base of plant', 'Rotate crops yearly'],
      prevention: ['Mulch around plants', 'Avoid overhead watering', 'Space plants properly'],
    },
    description: 'Early blight is a common fungal disease affecting tomatoes. It starts as small brown spots with concentric rings.',
  },
  {
    id: '2',
    plantName: 'Rose Bush',
    disease: 'Powdery Mildew',
    confidence: 88,
    severity: 'Low',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    detectedAt: '2025-01-14T14:20:00Z',
    status: 'needs-attention',
    treatment: {
      immediate: ['Spray with neem oil solution', 'Remove heavily infected leaves'],
      longTerm: ['Ensure good air flow', 'Reduce nitrogen fertilizer', 'Prune for better circulation'],
      prevention: ['Plant resistant varieties', 'Water in morning', 'Maintain plant spacing'],
    },
    description: 'Powdery mildew appears as white powdery spots on leaves and stems. It thrives in warm, dry conditions with cool nights.',
  },
  {
    id: '3',
    plantName: 'Basil',
    disease: 'Healthy',
    confidence: 96,
    severity: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7de3?w=400&h=300&fit=crop',
    detectedAt: '2025-01-13T09:15:00Z',
    status: 'healthy',
    treatment: {
      immediate: [],
      longTerm: ['Continue current care routine', 'Regular pruning for bushiness'],
      prevention: ['Monitor for pests', 'Maintain consistent watering', 'Fertilize monthly'],
    },
    description: 'Your basil plant is thriving! Keep up the good work with regular watering and harvesting.',
  },
];

// Mock 7-Day Care Plan
export const mock7DayPlan = {
  plantId: '1',
  plantName: 'Tomato Plant',
  disease: 'Early Blight',
  startDate: '2025-01-15',
  progress: 43,
  days: [
    {
      day: 1,
      date: '2025-01-15',
      status: 'completed',
      tasks: [
        { id: '1-1', title: 'Remove all infected leaves', completed: true, type: 'action' },
        { id: '1-2', title: 'Apply copper fungicide spray', completed: true, type: 'treatment' },
        { id: '1-3', title: 'Document current condition', completed: true, type: 'monitoring' },
      ],
      notes: 'Removed 5 heavily infected leaves. Applied fungicide in the evening.',
    },
    {
      day: 2,
      date: '2025-01-16',
      status: 'completed',
      tasks: [
        { id: '2-1', title: 'Check for new spots', completed: true, type: 'monitoring' },
        { id: '2-2', title: 'Water at base only', completed: true, type: 'care' },
        { id: '2-3', title: 'Remove any fallen leaves from soil', completed: true, type: 'action' },
      ],
      notes: 'No new spots observed. Plant looks stable.',
    },
    {
      day: 3,
      date: '2025-01-17',
      status: 'completed',
      tasks: [
        { id: '3-1', title: 'Second fungicide application', completed: true, type: 'treatment' },
        { id: '3-2', title: 'Inspect neighboring plants', completed: true, type: 'monitoring' },
      ],
      notes: 'Applied second round of treatment. Other plants appear healthy.',
    },
    {
      day: 4,
      date: '2025-01-18',
      status: 'today',
      tasks: [
        { id: '4-1', title: 'Monitor for improvement', completed: false, type: 'monitoring' },
        { id: '4-2', title: 'Adjust watering schedule', completed: false, type: 'care' },
        { id: '4-3', title: 'Take progress photos', completed: false, type: 'documentation' },
      ],
      notes: '',
    },
    {
      day: 5,
      date: '2025-01-19',
      status: 'upcoming',
      tasks: [
        { id: '5-1', title: 'Apply organic mulch around base', completed: false, type: 'action' },
        { id: '5-2', title: 'Check soil moisture', completed: false, type: 'monitoring' },
      ],
      notes: '',
    },
    {
      day: 6,
      date: '2025-01-20',
      status: 'upcoming',
      tasks: [
        { id: '6-1', title: 'Third fungicide application', completed: false, type: 'treatment' },
        { id: '6-2', title: 'Prune for better air flow', completed: false, type: 'action' },
      ],
      notes: '',
    },
    {
      day: 7,
      date: '2025-01-21',
      status: 'upcoming',
      tasks: [
        { id: '7-1', title: 'Final assessment', completed: false, type: 'monitoring' },
        { id: '7-2', title: 'Update care plan if needed', completed: false, type: 'planning' },
      ],
      notes: '',
    },
  ],
};

// Mock Chat Messages
export const mockChatMessages = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your PlantCare AI assistant. I can help you with plant diseases, care tips, and answer any questions about your plants. What can I help you with today?',
    timestamp: '2025-01-18T10:00:00Z',
    quickReplies: ['Identify a plant disease', 'Care tips for tomatoes', 'Pest control advice'],
  },
  {
    id: '2',
    role: 'user',
    content: 'My tomato leaves are turning yellow. What could be the problem?',
    timestamp: '2025-01-18T10:05:00Z',
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Yellow leaves on tomato plants can have several causes:\n\n1. **Watering Issues** - Both overwatering and underwatering can cause yellowing\n2. **Nutrient Deficiency** - Often nitrogen deficiency\n3. **Disease** - Could be early blight or septoria leaf spot\n4. **Natural aging** - Lower leaves yellowing is normal\n\nTo help diagnose better, could you tell me:\n- Are the yellow leaves at the bottom or throughout the plant?\n- Do you see any spots or patterns on the leaves?\n- How often are you watering?',
    timestamp: '2025-01-18T10:06:00Z',
    quickReplies: ['Bottom leaves only', 'Throughout the plant', 'I see spots'],
  },
];

// Mock Nurseries
export const mockNurseries = [
  {
    id: '1',
    name: 'Green Thumb Garden Center',
    rating: 4.8,
    reviewCount: 234,
    distance: '2.3 miles',
    status: 'Open',
    closes: '7:00 PM',
    type: 'Full Service',
    address: '123 Garden Way, Springfield',
    phone: '(555) 123-4567',
    specialties: ['Organic Pesticides', 'Disease Treatment', 'Expert Consultation'],
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Urban Plant Nursery',
    rating: 4.6,
    reviewCount: 189,
    distance: '3.1 miles',
    status: 'Open',
    closes: '6:30 PM',
    type: 'Specialty',
    address: '456 Plant Street, Springfield',
    phone: '(555) 234-5678',
    specialties: ['Indoor Plants', 'Hydroponics', 'Rare Varieties'],
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Organic Gardens Supply',
    rating: 4.9,
    reviewCount: 312,
    distance: '4.5 miles',
    status: 'Closes Soon',
    closes: '5:00 PM',
    type: 'Organic Only',
    address: '789 Eco Lane, Springfield',
    phone: '(555) 345-6789',
    specialties: ['100% Organic', 'Composting Supplies', 'Native Plants'],
    imageUrl: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Sunset Garden Shop',
    rating: 4.5,
    reviewCount: 156,
    distance: '5.2 miles',
    status: 'Open',
    closes: '8:00 PM',
    type: 'Full Service',
    address: '321 Sunset Blvd, Springfield',
    phone: '(555) 456-7890',
    specialties: ['Landscaping', 'Tree Care', 'Seasonal Plants'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
];

// Mock User Plants
export const mockUserPlants = [
  {
    id: '1',
    name: 'Tomato Plant',
    species: 'Solanum lycopersicum',
    status: 'needs-attention',
    lastChecked: '2025-01-18',
    health: 75,
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
    location: 'Backyard Garden',
    notes: 'Currently treating for early blight',
  },
  {
    id: '2',
    name: 'Rose Bush',
    species: 'Rosa hybrid',
    status: 'needs-attention',
    lastChecked: '2025-01-17',
    health: 82,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    location: 'Front Garden',
    notes: 'Treating powdery mildew',
  },
  {
    id: '3',
    name: 'Basil',
    species: 'Ocimum basilicum',
    status: 'healthy',
    lastChecked: '2025-01-18',
    health: 96,
    imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7de3?w=400&h=300&fit=crop',
    location: 'Kitchen Window',
    notes: 'Thriving, ready for harvest',
  },
  {
    id: '4',
    name: 'Snake Plant',
    species: 'Sansevieria trifasciata',
    status: 'healthy',
    lastChecked: '2025-01-16',
    health: 100,
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-b318ac1c5799?w=400&h=300&fit=crop',
    location: 'Living Room',
    notes: 'Low maintenance, doing great',
  },
  {
    id: '5',
    name: 'Monstera',
    species: 'Monstera deliciosa',
    status: 'healthy',
    lastChecked: '2025-01-15',
    health: 91,
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=300&fit=crop',
    location: 'Office',
    notes: 'New leaves developing nicely',
  },
];
