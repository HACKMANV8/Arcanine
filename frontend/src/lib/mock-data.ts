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
export type DiagnosisStatus = 'healthy' | 'needs-attention' | 'critical';
export interface Diagnosis {
  id: string; plantName: string; disease: string; confidence: number; severity: string;
  imageUrl: string; detectedAt: string; status: DiagnosisStatus;
  treatment: { immediate: string[]; longTerm: string[]; prevention: string[]; };
  description: string;
}

export const mockDiagnoses: Diagnosis[] = [
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
    confidence: 68,
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
        { id: '1-1', title: 'Remove all infected leaves', completed: true, description: 'Carefully remove and destroy all leaves showing signs of infection to prevent further spread.' },
        { id: '1-2', title: 'Apply copper fungicide spray', completed: true, description: 'Apply a copper-based fungicide to all parts of the plant, following the product instructions.' },
        { id: '1-3', title: 'Document current condition', completed: true, description: 'Take photos of the plant to track the progress of the treatment.' },
      ],
      notes: 'Removed 5 heavily infected leaves. Applied fungicide in the evening.',
    },
    {
      day: 2,
      date: '2025-01-16',
      status: 'completed',
      tasks: [
        { id: '2-1', title: 'Check for new spots', completed: true, description: 'Inspect the plant for any new spots or signs of the disease spreading.' },
        { id: '2-2', title: 'Water at base only', completed: true, description: 'Water the plant at the base to avoid getting the leaves wet, which can encourage fungal growth.' },
        { id: '2-3', title: 'Remove any fallen leaves from soil', completed: true, description: 'Remove and destroy any fallen leaves from around the base of the plant.' },
      ],
      notes: 'No new spots observed. Plant looks stable.',
    },
    {
      day: 3,
      date: '2025-01-17',
      status: 'completed',
      tasks: [
        { id: '3-1', title: 'Second fungicide application', completed: true, description: 'Apply a second round of copper-based fungicide to the plant.' },
        { id: '3-2', title: 'Inspect neighboring plants', completed: true, description: 'Check nearby plants for any signs of the disease.' },
      ],
      notes: 'Applied second round of treatment. Other plants appear healthy.',
    },
    {
      day: 4,
      date: '2025-01-18',
      status: 'today',
      tasks: [
        { id: '4-1', title: 'Monitor for improvement', completed: false, description: 'Check the plant for signs of improvement, such as no new spots and the existing spots not getting larger.' },
        { id: '4-2', title: 'Adjust watering schedule', completed: false, description: 'Ensure the plant is not being over or under-watered.' },
        { id: '4-3', title: 'Take progress photos', completed: false, description: 'Take photos to compare with the initial photos and track progress.' },
      ],
      notes: '',
    },
    {
      day: 5,
      date: '2025-01-19',
      status: 'upcoming',
      tasks: [
        { id: '5-1', title: 'Apply organic mulch around base', completed: false, description: 'Apply a layer of organic mulch around the base of the plant to help retain moisture and prevent soil-borne diseases.' },
        { id: '5-2', title: 'Check soil moisture', completed: false, description: 'Check the soil moisture to ensure the plant is getting the right amount of water.' },
      ],
      notes: '',
    },
    {
      day: 6,
      date: '2025-01-20',
      status: 'upcoming',
      tasks: [
        { id: '6-1', title: 'Third fungicide application', completed: false, description: 'Apply a third round of copper-based fungicide to the plant.' },
        { id: '6-2', title: 'Prune for better air flow', completed: false, description: 'Prune the plant to improve air circulation, which can help prevent fungal diseases.' },
      ],
      notes: '',
    },
    {
      day: 7,
      date: '2025-01-21',
      status: 'upcoming',
      tasks: [
        { id: '7-1', title: 'Final assessment', completed: false, description: 'Assess the plant for any remaining signs of the disease.' },
        { id: '7-2', title: 'Update care plan if needed', completed: false, description: 'Update the care plan based on the final assessment.' },
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

// Mock Marketplace Products
export const mockMarketplaceProducts = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    price: '2.50',
    unit: 'per lb',
    quantity: '50 lbs available',
    seller: 'Green Thumb Garden',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 120,
    severity: 'Medium',
    farmer: {
      name: 'John Doe',
      phone: '555-123-4567',
      email: 'john.doe@example.com'
    }
  },
  {
    id: '2',
    name: 'Fresh Basil',
    price: '1.00',
    unit: 'per bunch',
    quantity: '100 bunches available',
    seller: 'Urban Plant Nursery',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1579112944287-58a934e3ae71?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 89,
    severity: 'None',
    farmer: {
      name: 'Jane Smith',
      phone: '555-234-5678',
      email: 'jane.smith@example.com'
    }
  },
  {
    id: '3',
    name: 'Red Roses',
    price: '15.00',
    unit: 'per dozen',
    quantity: '20 dozens available',
    seller: 'Sunset Garden Shop',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1532708059644-55900612de8b?w=400&h=300&fit=crop',
    rating: 4.2,
    reviews: 45,
    severity: 'Low',
    farmer: {
      name: 'Peter Jones',
      phone: '555-345-6789',
      email: 'peter.jones@example.com'
    }
  },
  {
    id: '4',
    name: 'Cucumbers',
    price: '1.50',
    unit: 'per lb',
    quantity: '80 lbs available',
    seller: 'Organic Gardens Supply',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1583096114034-a694c5a48436?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 210,
    severity: 'None',
    farmer: {
      name: 'Mary Williams',
      phone: '555-456-7890',
      email: 'mary.williams@example.com'
    }
  },
  {
    id: '5',
    name: 'Bell Peppers',
    price: '1.75',
    unit: 'per lb',
    quantity: '60 lbs available',
    seller: 'Green Thumb Garden',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1599421493390-01628544a3c4?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 95,
    severity: 'Low',
    farmer: {
      name: 'John Doe',
      phone: '555-123-4567',
      email: 'john.doe@example.com'
    }
  },
  {
    id: '6',
    name: 'Carrots',
    price: '1.25',
    unit: 'per bunch',
    quantity: '120 bunches available',
    seller: 'Urban Plant Nursery',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 150,
    severity: 'None',
    farmer: {
      name: 'Jane Smith',
      phone: '555-234-5678',
      email: 'jane.smith@example.com'
    }
  },
  {
    id: '7',
    name: 'Sunflowers',
    price: '10.00',
    unit: 'per dozen',
    quantity: '30 dozens available',
    seller: 'Sunset Garden Shop',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1563241527-540e8783547c?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 60,
    severity: 'Low',
    farmer: {
      name: 'Peter Jones',
      phone: '555-345-6789',
      email: 'peter.jones@example.com'
    }
  },
  {
    id: '8',
    name: 'Zucchinis',
    price: '1.00',
    unit: 'per lb',
    quantity: '90 lbs available',
    seller: 'Organic Gardens Supply',
    location: 'Springfield',
    imageUrl: 'https://images.unsplash.com/photo-1580296690886-3c3335473240?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 180,
    severity: 'None',
    farmer: {
      name: 'Mary Williams',
      phone: '555-456-7890',
      email: 'mary.williams@example.com'
    }
  }
];
