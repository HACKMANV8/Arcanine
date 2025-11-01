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
  {
    id: 'completed-plan-plant',
    plantName: 'Completed Plan Plant',
    disease: 'No Disease',
    confidence: 100,
    severity: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1508704019882-f9cf40e99f45?w=400&h=300&fit=crop',
    detectedAt: '2025-01-01T09:00:00Z',
    status: 'healthy',
    treatment: {
      immediate: [],
      longTerm: ['Maintain regular watering', 'Monitor for new issues'],
      prevention: ['Keep area clean', 'Ensure proper sunlight'],
    },
    description: 'This plant has successfully completed its 7-day care plan and is now healthy.',
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

export const mockCompleted7DayPlan = {
  plantId: 'completed-plan-plant',
  plantName: 'Completed Plan Plant',
  disease: 'No Disease',
  startDate: '2025-01-01',
  progress: 100,
  days: Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    date: `2025-01-0${i + 1}`,
    status: 'completed',
    tasks: [
      { id: `${i + 1}-1`, title: `Task ${i + 1}-1`, completed: true, description: `Description for task ${i + 1}-1` },
      { id: `${i + 1}-2`, title: `Task ${i + 1}-2`, completed: true, description: `Description for task ${i + 1}-2` },
    ],
    notes: `Notes for day ${i + 1}`,
  })),
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
    imageUrl: 'data:image/jpeg;base64,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',
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
    id: '4',
    name: 'Cucumbers',
    price: '1.50',
    unit: 'per lb',
    quantity: '80 lbs available',
    seller: 'Organic Gardens Supply',
    location: 'Springfield',
    imageUrl: 'data:image/jpeg;base64,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',
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
    imageUrl: 'data:image/jpeg;base64,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',
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
    imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRMWGBcVFRUYFRUYFRcVFRUWFhUVFRYYHSggGBolHRUVITEhJSkrLi4uFx8zODMwNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAEBQYDBwIBAP/EAD4QAAECBAQEBAQEBQMDBQAAAAECEQADBCEFEjFBBlFhcRMigZEyobHwFEJSwSNigtHxcrLhFXOiBxYzU2P/xAAbAQACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EADURAAICAQQABAMIAgEEAwAAAAECAAMRBBIhMQUTQVEiYfAycYGRobHB0RThQhUjYvEkMzT/2gAMAwEAAhEDEQA/AKeZNCQY+ZKpJno4jmTfEJh4LslM5mNNSHMX0i72DE4RtKmBGkKMpaXgVZixBg1emBlS+IzwqpKwIWvrCwqnIjXJCmZBM/eAGjt5kZnzLHZkzGrNoJX3IxEaklSrQ8CAsCc5jqjlWhKxoQTWZJEUDGTMSBF+Z082ieZGZ8VLMSGnTIoMWBkZn5KI4mSJslhFOTLYnxahHAGQZhMaCLmVzPIZotzJBgy0AwQEiTMQljF85E6aeLFds6apAMUyZGJ7NM+kR5mO5xEyXIIiwcGdiaS5ZiCwk4nmZNaJC5kTBU14uFxJnpGsQZ2IdKAMAbidNUSbxQtOxDJSBAWJnYg89PKCKZMzlTg7GLMhxmRmFppwYEXkQCfTvDCviSYKZKUwTcWlZmEv8Ii+cdyJsimLXgZsGZwMEqsPzGDJdtEsVzG2G0+UQpc+4ywhhW0BxmTMfxl2i/les7iexOiu2SIsxOuCdYapqJlXbEGoKgEwW1CBBA5juXODQiynMIBPfjOIrtwZMXVBvaGU6gmg6cwL7QQ7SIIE5hsufAGSHUzedIUGcfEAQeh/eBq68/KcCD1MkyCDeLlwRxLgTWYh4qDLYg86VaCK3MGRA1yi0GDDMEQYKjM7GCnGMzgTNQgxTIl54XFhJgy0K1EEBEia00wksYq6gdSwMcU6oTcS2Z4rJjRasZkZgIqYN5c7M9CW9zHbsSJ6RKEVLGTifkyCDHbwZEJQkwMkSZpIWQ7xVwDOhcnrAWk5mU3eLrOaASpKs/SDs67YHJzHCCQITPcvmLzOGV4Y28yxMEUt4MBiUntCgA5iCCTOMxTiAJaLGnjMoGGYxkAGF24h1YEQ9LAWhc5M6BVM5oOi5kE4gJXd4PjjEGWhKFOIERiFUyf4ilki0aGkIEDcMiYYOS0E1GMwVecR9JUWhBgIcGE0YKlpSdCQPcwKzAUkTixwYTXUORTE21B6f3gdVu9cyisGGYKUBoLmQYwpMKJQS/xJCkd7uCPb3hezUANj58yPMwY1qpLyg2qQCPQX+X0hRGxZz6ytTYs59YukSs56DX9oYZtkbsbYIHUTMsHRcy2YDV1JSoBQKSQ4B1ZyNPSD1oGGRK7geoRJDiBNxInmdTtcxZXzwJXECUuDASMzBcku8EDDEiaSk84qx9pYGafhxrpFd5nETaRY3ijczhNZozCKKcS2IOaVrwXzMzsTKcthFlGZUnE1pp4IijoQZwaEr0eBjuTmCpnEHpBSoInAwmRPvAmSTmGhJVpAc47kZm6aPeBm2QWnzwmjt2Z2AZ8K4nEnEmqOa6WJjTsX4siBR8iEIS0DJzLgz5U0q1J8scliqfinHriJRQTEqcu8PecjDAirAgxpIqVWAhVkXuFrYwwzJg2gO1DDNYVmaSpdyGiTtXgRfezmaGXtFcwuIXTizNAnPMIp4mNZhxUNIvXeFMhuYrFLk2hrzN8pjEZBJTZQZwCORB0IO4hbO7kS64MbS8PKkJXLUCbFtCCNn79oUNwViriUawA7SIyq6cTpd7HbmlW4MLI5qf65i4JU4kjUiZLVkUk5jYbhW3lO8a6bHXcp4lt/MoKuoMsy+aU3HyI+UZ9aBw3zMaprDqwMIweeSFJOxcdlO49/rAtQgBDQWoTBDTWnlhIOW7qPyOnpFXYsRn2kOxYjPtMKajZaphvc5Byvr3+94I9uVCD8ZzvkBYgxOT4tQpWwISPQX+bw/Q3l0gQirwIelOVIOx09IATuMMAOpkuaFRcKROIgFYQkWg9eSYMjEUDFQ7PDn+OcZlNwjOinBUK2KVhAMzSoLaRVBOPEHXMMECiRmGS12gJHMsDPa5loqF5kxFic8gGH6UzA2DiD4NOKjBNQuBAoTmPV5iLQiNoMYgM0qBZrQdduJEJSHKRAjwDOlDJOVIjObky4WZrxNILPFhpyZOwTeRUBWkUZCsgrie1yoqGkBpDUc0P0jdsXiLLGEtRUWELkbeTCdyhppOVN4znfLQq+0wMsKVpBNxUSzqJ8mIlo5Ryl2kLWITImoVaxgbKyzmSGijSRpAPNIgN2IOuiEEFphM5ntEkJiCxM7M+5gbekRgjmTF2JUzg2vDNL8ySMifeG6kTEqp5oBKLpfdHTqPoREaxDWwtT17+//cWbI5EbU+H+Ep5ajlOqDcd0nUHvrCj3eYMOOfecbNww0+1jp/iI/qGxHPv1jq/i+Bvwl6/i+BvwmM+cmYEnKCxCkvspNxfYvFlRkJGfkfukinBwZjiagoS1jRVvfY/MQSgFdymH0+VLIe5lRTvDmqGwt84tYu+sSbV3oJtKn5JT7gOe6rj6iKMm6zH1xBlNz4m9LMaW6joL9yf+fpA3XL/DBuPj4mFNhtyVEBySw1uXuTrBHv4wJPmY6g+NXZKPyhg3Pf76QTTcct6wleQuT6wClwmaEqmTPIkAljdR5BtvWGH1NZYKnJ/SR5o3YET4rMOUtrDlCjdJsPEjEUk5Ux7gPG0bKwkSw2ZcYRSkJDmMPUWZPEer6jKdItCqvzOcRdMSdGhkEQBaelTWEQFyZIaaS1vFWGIVTPasK8TtEDUbIQgYnumwdMsvFX1LOJVah2IxkZRCz7pcpNJlOkjSKh2BlCIqmAJXDYyywRODD5sw5bQuq/FDAyMrJM5U7fLG1W9a1/OBYsWlXgspSQHMZOpYEwmcR8FCEMGDwZyGkrGNzHsLKuIitmJUcPVAe8ZWrQ4jNTgmVUxbiMoDmOKOZg7AmCdmWfuc64z4iUlWVJaPR+HaJWGTFbbccCe+CMamTFsS8V8T0qIuRL0OW4M6zSr8seScfFBWL8UBqq4JU0HSosJO4LwZ5nVYKbRK14Mkc9RNKrFZ22h1ql2ZlkPMppSvFTdircEa9QReM1soYNh5Z+XymH4GSFhRSqVMBcKSo/J3BHpFvOtKkZ3D2ldrEZBzGM+py3I8v6hcevKF1r3ddyqVluAefaK6upKXUkBUs/EAX15cu0NV1huDwYyqDpuDFc/EJaEkhXkVqDqlQ0/s0NLS7sARyP1EKf8AyiWp4uRlypBUyszi3X5G8Op4a27ceOJQuoOYAvilyVBJIN7dy8MDw7AAzI84ekd4bxNKVZVyfMHtcM31+UI3aCxevunZyePaMZNb4qrEBCfNq+Y7HrCzVeWOe+pbj0jsKcMDfc7wljBzA4xzCaeUlOgb6wJ2LdwLsT3PlZTeInLmID3bdtvvlE1v5bbsSqttOYuqMIkoDqKjyDi59oYTU2scLiEV3c4iSupEi4Ah6qwniGbAEBpqoBTQd6zjMpW/Meyk5hCDHEYM8VEkCJRiZTZEtbNDtD1anGYNgBNKRVxFbBxOUyjlKATGawOYbGYur860qMsOUwzVsUjdCE7RiTfD82fUmaU+USzlIOubUj6e8aWrWmgKDzn9oFLixlJgU5c1Jt8JIPcaxm6pVrP3y5sXGTN8UoLBW8Dou5xF2IbqDqJSnzBoKMMeIZOoln1jLYDWHFq+HJlS4BjqTNKUudYSZQzYk/OIazioJWUvpGhX4duXMGbgDiQUhbqjeYYExBZmUeEVBQoE6RnahA44jVLFTky/w+bnSDHn7l2tNdWyuZvUy3SYGjcyczn2PcNGap2j0Ol1wrXEC1e6N+FeG/CYtCmu13mcQtaBBLfMEpjCxuaCPJzOacYYotM4ZTaPT+H6dWr5mVq7GD8R5gdZ4iASYR1NWxsR3TPuEMnpAuNYCpJ4jB4n2nxLq0Q9EneDKCixFMxLTBb9Wx78jGfZQUOUgmrIOUnuZSLTeUsEcibeh3iosU8WCWFqniwRDjVV4SSpSfDUHcguhQ+kaGmr8w7Qcj9RGA3HeR85znEMSVNUSojLcBIBuG1bf/PKPR1ULWoAHMVawnj0i8TwGc/d/wC0MbMyonhVQ+1zYh9Lt+/3tYJicZ6VMLH5XY25cogLzIyRKLh7HChkrWMt/MRrozq0GsZur0gf4lHPtDI/zl5IxUlsoB9YwW0w9TDFAe43okrUylm36Rv3hOwqvC/nF7CF4UTxiWKZDkQz73DgdBFqdPuG5oNFUn4omqsSGpLw4lB6EaBUdRRiGJghneHKqCIKxsxXh6D4jmGrSNmJSleZV0s20ZLrG8zLEKqxi9VfMkkYklnXMmsBaNfCInMUckmVGH4YoMTGVdevpLqpj+lpntGfZZjmEd9ozCKSk8LNuCYHZZ5mIJ7PMxifMPo0IUsoAGc5lNuWAf5CJutd1Ab0lH4EIo6ZMsECzkn1OsDsdrDzKuS09VEkLI5C8Qj7QZCttETY9JUtWRAc/IQ7pWCjc0ZqbC8yExammU85JUXf5RvUOl9ZxFrCVYGUBnFUp+kZ23bZGgcrOZ4rIWZqo9PQ67BEHBzCMEp86oHqX2iIUplo0r3SNIVqwxjbjAjDC+JMqQCdIXv0O4kiEq1W0YMpqHFhMa8ZdumKR1LQ0aAJZ4Vy3ULnExXiSEbiLihng2sHrE+I8SJJypN9Icp0JAyYu2oHQiqZh3jOo6mGxf5XAlTQHGTNqOnMkMNIpY4t5kInlwqRUFSwnIqZ/IkkEjuAWEDavClsgfMzmu5xLGjw2UlIUmnyK65VLHqSfrGLZe7NgvkfkP4krj3mc6tILZW6H+0WWrIzmOJSCM5gU+dyAB/lDH5Xg6r9GG8sAdyJ4xxBVpZzEakKJD+hjb8OpX7Yx+EXtOBiR8+adibXDEn2LPGyiiLQCbM3IOwsBuDbVtCTDCj0E4n1MxTWA20trtrmb3e/WL+URK+aDDPGYu+ptcaajzEtzYOPnAduR9ftLkw6TM7ndrbadOn+HgDLOzgzo3B89KkpJVmbQlvmI834ghViAMRkciV6pjhjcHZgR9IxwuDmD2CeBSy90Ib/AEp+jRY2P6Eyu32glXXUsoFpaFK5BAue7WgtdN9h+0QPvlChHZknMQZi1TFAOouw0A0AHQAAekawPlqFHpLLzCZckCBljDLGVHIURpCtjgS8KmYWkiBDUEGRmfKPBkoLgRNmqZ+JXgQ6asJgCgtLCFyCksQYC27owLbup6rp3l1vEVL8UilPiiFOMhGph86Ut1HnpUiDq4lQT8UFGgYDqDCoI6pcVSUu8IvpjmCbT5PELpJwUXECsXaMQdiFRgxXjnDwqFBSizaQ1pdaaFwBBnawAMW1VF4Yy7Qylu/mMgccRLMwpKi7Q6NQQMSu0QTCcIXKQwv1g2o1KWNzE6KSFiXiJUx2F4d0YTGTA6jf1FMvCp7ZiktDZ1FWcZiflv3iPMIqygh7NCOoqDjiN0WERzU8RMk3hJNFlow+qwJHYjjMxZ1LRs06VEHUzHvZjN8E8xBN4HqeBgQtAycmXFLOATGG65M162wItxTEWEM0UZi99nETysUVmGVRCtBlJBfYBo1RVXswwGPnM02NuyDOhYHQ1igFTZplj9JZS/UH4fd+keZ1l+kBxUmfn0I/U13ZjqpkTABlUCP5kgn3aM5HQ/aH5RpGB7gNXNWhPmmJB5BKRB61Vzwv7w42nofvOa8UKzTip3s2bfbT2j02hG2rEDbJWrVYt337XT39vSNWsc8/X4wGeOIJMl5h05uNbE6bXgytgyjjIg+Ulg1/2J+W8EzjmBxziGDYHoCxdr2D6B/La+kB+YjHpzDqdVn6W5XOnW4Fvsgcen19fX3dnmXHBqwUMp7Eh0t9NowvEQQ3H6xuo8S6pZEsjykk92PtGC7uO5LM47hqKcEMbg8yf8wEuQciCZj6RdXcOJX8Cyk8jce+o+cMVa4r9oZgmYtENdh0yRdQtoCLg/fWNCq5LvsyM4EFwufnW0FvTauZNT7jiVaVBKYySCxjoXMXnFxnyA3hj/GO3dLkKI9pUOHMIWHniK2HniLMYkKWCE+8Nad1U5aEB4g2CInJBTNBtoecE1JqJ3JOVjjBg3EdaZSSc0F0dQsbGIbcAuZy/EcYWsm8epp0qoOom9rNAE1a+Zg5rWD5j7BseUCEqNoQ1OjBGQIeq4jgzpWD15UkZY8zqKQDzGWCvzHVOpZ1EJOFHUXcKOplXUxXF6nCzkYARHMlFJYw8GDDIk5m2dOS1rRTDbpeoDEia2YnxwDoTG3Wp8rIgLQN2JWykIKNtIyGLBpxUYiufhqFFgLQ2t7KIPyARFOOYWyLJaG9NqMtyYvfT8MhphvG6OplGNcJW0KagZjVEeLriBCIpyY6HxF8ypzG8MBNo4g2YND+H6k08zxUykTFsyM7snmQBvs+1+cA1dfnp5ZYgeuPWCXCnOJa4bxPUzFBP4cEn9Kj76WHcxiXeH01gnf+YjC3Z7X9f9R9ULmkMSlH6mc/+RaM9BWDwMxysL3jMWzaeXsFLV7B+gaGld/kBGdrHljgSF40pWUFszWYF+5PRnEbvhtmRti9yj0khVIChsWfnyf0tGwhIixgFwXBLm3owe3L77McEYMrmfUz76XYs9i9gdXBbr8jEFOJwYT7IQTfU/3Jvy0MQxEke8OSjlqSLPe7/wDH+ICTOHM6HwzRAISlRyqAHNu7jSPOa20lyVGRHKwccSpp6ZYDhlj7+7RlO6k88S5YdGG/iQASoLQ3MKIgOw54wYLHtB5lQVDyTW9Ax9w4gioF+0s4qfaSfEa5gcrJJ68unTtGtowh+zE7iQILwurzEnnBdcOMCRpe8mWiBnDRin4TmaoIAzB5GAoTM8TeCNrGZNkEWycx3ns0I45gtvM1p29Yo+ZR8wXEJxFgILUgPcNSgPJnOOOZ6mYx6XwxBniE1HCznijePQiJrMEzVZukEKriUDHMMo3Kh3gNnAlvWdb4WWQgPyjyOuGWmgi/DK+TUMOcY7JkxZ68maKnhoqEOZQIQZF4xWkTTlFo29PUCnMq9uDEisQXL8i/i0h0Uq/xL1KV3MvBiWfJWteblDqsqricxLHM2mY0uXYm0UGlV+RKNYQeY8wrGEm5MI36ZhG67VxPuNYglSCxjtNSVcQV9gKznNVLYmPRo3Ew3HM+01VliHrzOVyJTYV5xf5xmX/AeI7UxaMJqEJ5QBCzGHZcCEYbSJUoOcqdyA7DtvEX27FO3kyiVljOgYYZKEESQSzPYuT/ADFo83f5rvmwxpU5xPy5K1nzW5Dl6CODKg4jQdUHEyXKN0o10Kv2iwYfaaTvzy0R4xRSmKAM5NlE3HZtzD+ntfhupVxvHM5xjWGKkrLPksQW02Y+5j0mm1AtUe8XdCIqWEkkn++jt1++8NDI4giJ48IMdG11/vq/P/AtuMiaJlPZKSduWvIHW30ipbHJMnEq8AwFj4ky7gFtg+56xk6vWZGxIdK5a0lGAkG7CxPLr2jEstJMZXH4xnSoWi4Ljnse8KuVbgzmw3BjVE9xdJB7Ej5QqUwe4sUAPBgiqFJdSQBzANv+IKLiODCLZjgyc4kw9akWLgOw5do0tHcoaCvXIyJIYZVeHMym17xsXV70yIpS2DidFwaeFJBjzmoQqcTRzkTHHsaTKFzF9LpTYZIAUZMV4NxGJpZ7w1qNCaxmERg0r6FTxj2jEXuGJ9ryAOsRVkmdTkmQvFNCZqDaN7Q3eW0ctTKzl1bSKSSGj1NdgYTNIImCZKjBCwlcyi4dwZSlBRFozdXqlUYh6kJOZ1PBqIMAdY8rqLTmNudgj6XStCBszFDbmDViTBazLDkRauhSovaGRcy8TvLEk+JkpTNJ5mNbRFmrxEriFbJgCqxOWGBUczlvGJNYjJKzbnGlSwQcwLnceJ8FHPSzO0Sbam7lCLBPi0TwWWC3yMcDUeVgmLg/FPlRLfaJRpzTCgoypWmkEttCrKV17mjWqq/CFrQolfmGaIXaJ+oqKoqBmQ3Yx1ltFBw0sEZxkSz4XoZgDTEsRGLrbUJypj1KYHMoqrEDJQyUhh3uecZyUi1skytgC8z3gmIrmyjNmBKUknKzjypsVKJPN/aK6mha7NiZJ9YKti4zCBMKwyLJ3V3/AEgQPaEOW79oXMHnUyUEAXUdOnWCrYX5PULXg8xNX0IV5WdzfrDlVxXmS6ycrOFEErYEaaaAsH+bn1jSr8RYAZipq5mP/tOXuVH1i/8A1F/TE7yxGmGYIiWkML3udTc6wrfq2c8y6oFlBhdMHykfe0Z17nG4QmMRtT0/hqZ7HR9OxhR33rmQSGE0xJSpMtS0ICsvmUhyAU/mynYjXTbq8VpC2uFY9+sFuzPlFi8pQBLo6KH7i0dZprAfecVYwzx5S7iYl+YUl/W8C2WL2plRvXjECqyCCHBHMaQavIOcQ2OOpzbHKIfiBl3Om0el01p8n4pmWDFnEt8JW0tm0EYd4y80K2GJz/jiqV4jPaPQ+GVrslbW5jHgiplCzB9zvC3iVbmXqInQ8PxBLtHnbaTjM513QychK93gKlllULJF1fSADR4ZqtMZS3I5kniODJUonL8o1qdUyjGZ20NBqXh1D/DBH1rY7lfLUSjwzCch+G0Z12p3+ssCAI7RIZiLQiXzwYMvngwufPAS5sYCqEtiLqvxSYq8YzFheNSvTYGTDZA4E2lrLRQgZlxJaRw/OqVqM4lIB03LfQRqtra6FAr5mb/jtaeYgxrA50ubklpUpOzAmNDTauuyvc5AMUsoZHwJR8N4QQh1pv1jN1mpBb4TNHS1ccia4uuXK2EV04eyMuiqIjTiEuZ5SzQ95L1/FFmVX4hKsEATmBccoENWS2DFn0pXmY4YhBJFh9YvcWxmX04EC4loAR3g+iuOYzaoxKHgKSQgBozvFGBbuF0/Al0AltIwucwnOZM8RrdkuwUQCr9Lm5/eNPRj1x1+sW1T4GIgxXHFTZiJMhJEpJSiUjdRcBJV8vrGhRpFrQ2WH4jkk+0Sa8khV6/edHoJOSWAdhc8zuezx5u1t7kiP89QWqlarOp0HIQVG/4iMKw6E8yKbylf5jZPQksDEtZ8W309ZDNzie62kCUKYWYD5vFarCWGZVWzEypH1h0PJAhVDIDsdLmBWuccTvSe6VBzWuR02irkY5k5944QtK0sdDvCZBU5EEQVORPf4hKWlzCASLE/Cocn56WiNhPxp/6gyMnIiLFsOMtyAcmx5dDD9F4fg9wqOCJIzKBXiZgY1xcuzbO9cyjp6gBLKMZroS3EuWGIvnIlqXmYPzhpCy14MznKl44o69DZU3YQjZS2dxjVTr0JD8X4eqYt0iNzw+5UXBnWKSY14QwHIlzqdYV8Q1m84EPXVtXJj3EZZSktCFLbjzIHcU8L4pOVUFCy0sXc6nkBDeu09S07lHMjeScSvq8SQVplJuo3PQDnGPXQwUuepCDB5n6bSgmOWwgQofiYSJYSonYQRmJGJxaM5tShKM7hoVVGZtsWwc8yPxDj6SnypuY2KfB7TyYJtTWvUZYLioqOsLanTmiGrtDwxeFS8zwEah9uJfGeZjVKSlTAxdAWGZxcrxFM7iySJhYhjDi+G2FOpcOvUc0lciZcNCVlLpxCGvjIms9aWiiBsyoGJzzjRCiC0ei8NIB5lNRys57KnqQt3j0TIrrM8HBnTuHiZ0oB2tHl9WBVZHAN6xXXUCpEy73uDzhqq5bk4meyNU3MXYhUqPUQzTWJD3HEruDK4FIGkZHiVJBjmlu3DErqgnK4MY6YzHhIzH56naNrSIMZmRrX5xDeFkyworUHWkOlIDkPa3XWBa0ts2j1MtpgDzKrDKiZMUc6MiQPKnUnk8ZFyIijacmNZOOpvUIzqb8qdep3/aBodq/MwinAgFBiyJk9UhBCvDGYkaAuzfM+0M26Zq6hYw7lmwB84wrg6QOagPr9+kLVcHPyg1ODAKyU0zuQfeGK2ykIphAkhSgQPLoe5cwPcVXEgnAn6unS6dpiyEo+FRv+bT5t7x1SvdlF5ME1gCkscTSxSFoIUkhwQXBB3DbGK8g7W7hFcNF2P1CV0y1JPnlDPl/NlHxOOTX9BDGkQreAem4/qDb4STOeUnFMx8udQTowUW9nj0Vnh6Y3YGYFbsmOpdeCmwhI04MMbBiJcSr5n5RDtNKesTtuM3wOYsp82sU1KqDxB1DPMbYKVJUXGpfqYU1O0gYjVB2mb4mmaouhHuYHQUX7Rh2Z/wDiJ6wmtWPKoARF9SnkSyXE8GEYjiKQklR0gdNDE4Eq9gXkznNdiS1TSpCikcxHpKqEVAGGZj23M7ZBlHwbiiwpmKiTdR5dTGb4jp1K56+Ub0dzZ29ytrMbyODGRXpN00GsAiMcVoQhYNydIe/6czMCIr/kqoOYrOKLmySgLN9o000VSuGxE/PcrtBk/RYWVTAlWj3hu9yiFhAoMtgzquC0aJEvyhrR5DU2ta/M26agBxJjiXjPwl5U7RqaLwvzFyZay0JwJPHitS/MTGj/ANOC8RRrNxzJwI3e8aOZOJ0fgtKggPHnPEiC3E0KPs8ytmi0ZC9yGiDFqYLBDRoUWFTKk5Eh63h11O0bletwsWanmVvDMvwktGRrW8xoxWNomXE9WlSSnfURfRVspzFdWwYYkuhnvpGxniZuDHWGKSm4+UZ+oy5wY3UMcysosRzJ6RkWUbWmgr5EU4stAOZWkN0BjwJm6pMnMFwfiAS5rS0GY+oSHPeC6jRGyvLHH3yuns2HAGcy+k12YDy5CphezPqT2jz7U7T3nE0xXkZkrx5xT4UsypGpDKWNhyT16/Y1vC/D/Mffb+X9/wBTsFBubuJP/SxRP4hTboGdy5fMcvYM/wDVD3jmMIv3/wAQVfJJjjGuIHrJCZawpFOpp4BD51jKokckg68yYT0uj26Zy45cfD9w5H5n+IrdYy2qR0O/x4/SO+LZ6JcvOsskAOQ5PlL2a78oV8LUvZjGf9xl+azBMN4hP4RapgCZ0tQStJJSkr1SXAJSFNy5iL26D/5IRT8JBI9ePUfeIIXEoS32hx+M911UK/D5nhj+KEhRlghRC0EKypJsQWYG2uxsKV1nRatd/wBn3+R4z+Hr/Mo//eqIH0RzJHgvitUhQlTXVIUdf/rJOo/l5j15vr+JeHC4b0+0P1+vQ/QT015r+Fuv2j3HqTxlliQA4BFixcEeoLesIaWzyl5mu6l4BRYRKk/lHfeGm1T2fagPLCQ1NTJ0cCJWoNzKNZ6ScxtOZQEtQh2sKg5ij5zCqJM1KWSgf6nhWzyy2SZZbCBgCe5ONJk3mF1bgXaKtpDbwnU7ziOTD5fECJqXScr84XOietsHmNrq8rBFlYJUS6ToQIMNpGMcwItbMR4zNUQbkw9p1APUFeSRPuAYZKWgrWfhYkPYpNgdHDFh/UI7VaixG2qO5FFCsMtKuhq6cDIhugEZNtdxO5ppVmsDCxFiq/Emsk23h+gbK8mK2NubEcYPgEvLmmAKJ2O0J6jWPuwnEPVplIy0S8QUSJas0vy8wNPaHtHe7DDxXU0hDlYFRVCgpOVJJJt/xD1tg2ERNW+KdNkU5VLAVYtePHs4D5E9An2RIPiXhDxJySmw/N1jf0XiXl1kH8IG2kseIhxLB0y15QLAQ/TqWddxgHrCnENwrh8kgq2gF+tGOI1XT7zpeE4XllnK2cDQ7W36x5m/UZfnqVuvz8FX3EzSsklEtC3JzKSkpa7LLAjrp7xFbBmK+wJ/KcbAPhHQ4kxjU9Uup8AArUWygC6goOGH3pGnpkV6fNPA9fliCN+Dgz5jeWQtMtRBX4aVLGuVSndPyB9YnTZuUsOskD7pfzh6xYMVAFoZ/wAck8yvniTGN4gVTHEammpwkSufLRdMrTDIqEFmUXD1aLJId4ztXUexC13BeJeyJAyho8+znPM00ORmSPGtSAkpBvGx4bWc5MU1ZBGBE3B8icmaClTE6k8od8Qeo1kMJXSVOrZE6wEnJcueceSyN3E2E7nO+NpJ12j0XhrDqC1QOIvwLiY0tNNly0AzZinTMLMgZQHA3NrDTvpDGq0A1Fyu5+EDr35iatiTUqYpKwtJIUC+Z7udSTu8abKrLtPUoTOk1/EvjSZIWCJqUOQ3lWpWTwz76iPO0aLybXK9E/l3mcbdsUoQpUmYolWQhls5Iyl5cxhcsrXdlE7MWSQtqqO/T8ex+I6+Y+c6+k+XvH4/wf7+X3RXhmKTJRStC1J1uksdtOcN3UJYCrjMy1sK8iYVUwlSlEgqUSokJYFy7hO3YWEWRQFAHQg3znMppHEf8NBWRmIYsGDpLe7ZT6xm2aLLnaJo0aklBmCV2PgixglWjIln1AiWZiRUYdFAURN7cx5gNFMqSyASBqdhCWqtSgZYzq0azqU1fgM8y8iV5ev+Iy6tZSH3MMxpdE5HBk8vhabLQQtSSTuBc940R4hXYwKgwq6JlXBjTA+DpeTMuakjUgE5x/SWhXU+Jvuwqn+IVdIo4Ilcmlp8oQUkpHPp2jHNl+7cDDnTnGMCYTcBpF6S0l9tx6QRdZqU9ZU6cf8AJZIV+AmVPaXKWKeYhcmawJyFQdCu2YJ82iTqzB9qjVi2r42G8EEfP3H5Z49fT5I317G+AcQLhXhapRNUJyD4IKVy5rsgzBMQlG7hKsxCg23NIjQ1VtdtYas8ng/cf5Hf5+8BWGB5jaj4eAKiKqXMmg+ZJZCSrcJUVFy77CF7GRxheB6Zl0GD3kwgYl5lSj5JiXBQrym3XT3aEf8ADPcMNVjieUJpl3mzEvycm/LyvFSL04QSpvpb7bQjCKKX4jyAJhOjEeUc76DqY5lvt+A8SdP/AI4fcGzN8cxabTpKlJBSCAopLlL2BI1Z7OHEUr0Cu23PP4zQGqqJwIFIx1MwPHNpChxDZBmE2UhRcwRWZRiCKgmUXDElE3zEMQHA/eM3Ws1fEE9pav4fWNipMnxHU+YhV7cg3uIVwbtuB8oLT6cj856k4nLWSykqZgGY36RVtO6DkEQxpOJvIoZYmKmhAM1QCSsgZsoAASDytFGucoEJ+H2ixQA7j3EeM8PSkS500SVVNRMCmzeZRUoMG0TLSLXDMBzh7Ta2x3SvcEQe3t+5zBFAAT2ZxmqMxCjLWlSVpLKSoEEHqD7+se0TY43qcg+0SLEcGC5CS5guQBxK7oRJp06mBs7ekkuIww5YCwBpC9wyuZNYy06DR1oyNHnbKvimyhG2R/ENLnmO8bOks2piLtXufMpOElUslGaYQJnX6CM3Xi+1sJ1HVUKvcqVTfEDp+HnGUF8s4PcMhAkzjuGZ0kRp6XUbCDCum5Zz7EMKXKOjiPQ1ahbBM6yorADLUfyn2hjI94LBldh9PnMhKhfwh3BSlTH5CMi59ocj3/qdszaoP1gSowKkyMBtGVqrN/M0lG0Yh/EPDsuoksgJRNF0qYAE7pU3Pnt7gg0mueizLElfX/Uz9TpQ4+HgzllXTLlKVKmJKVg/Cdj9CDzHSPVV2LYodDkTFYEHae5hOQVS7bLBH9SS/wDtT7CCKQr8+0tV0YIuTzeChvaQ0ZYPgs6cQZcpS08xp7mFtRqq6h8TAGXrqZ/sjM6lwxRzadDKQlI5DX1jyuttrvb4TmbOloYDaYm444sXJT5Ayod8M8OW0/FD2N5QwJAVnG9QtLbx6CvwqlTmLNqHIjLhfi1RIE2amWpJBSJgIlLT+ZJmJcyzyJBELa3w0AfApIPt2Pnj1/OWqvJ7M6dg1WipSVS1IUxYhC0rY9SnR48vqK3oba4I+8Y/eMi2GTpSEh1lu5+3gKszfZhVsY9QdFVJY5Zige7W/qtBdluckSlysftcfOc8xbGXmqmCZMLOEAnyqcMTl033Hbp6LT6bCBdo57+v9zDvcK5G7MR1GKzVquk3J8yH8xGrpOp7H0h9aEA7/OKFc8iVVbRVFQJNVISDODJmSypKFKAHxecgG/yUP0wFRWymtjx7xjDNh17jSo4XzJC3TIWblK5iMt9mSSR99oTrNgO2wjHvnn6/KEu0lbLuQ4Pt/ubYJSKlKKVT5BlrBCwJpcG4SrzAaFt7x1lSsOCPr74CqmxG+R+cDmSikZZzLQrMgkF0qT8J8w769YXIJ+JOxKNvrYE+kR1GHrkLEtAMzMcsspDklnAIGha/JnOxZ1XS9d/Xv8ptValHTI4x2JtKRVgMqRMfokqHulxA2FBPwsPzlRcDzmdGoJcqUFCWSVps6h8QLF0bFLEXHrGBrFfzMdr7/wB94P8AEis7pz//ANRMYXnEt2DZib82Y89NOZEbXhGlXaXx8od32jAkZS4pOQt0uG0UDvc2a7OOusbT6ep1wfylFtYGdv4YrDOkoUvM5SCwdrjprHh9bUKrGVcdw9uByoEY4oqeENTolu2qyRfoAGPqYVoFJb/vE/h9fxE23Y+c4xj9BP8AxCjUBQmq8yipr7AgixTZrWs20e10t1PlAVfZHt9Z/OZdisW57mKcLs5MF87Jg/KafZdMgawTkyNs0aXdrGANvzD1gCEyMQKbPAWpB5jK2Ge5VTnVFWr2CFqbc0fYNRSM+acHI0B0hDUW27cVzQCg9ytpqrxLSx5Bvt6RkPXs5buW4Ezr5Owi1Te8KrExJVUKVQ8lxElsGBf9LSDoIP8A5DY7lMAT5LlNWSk//kf9q4ktnTMfn/UUf/8AQv16GUVGm7bxm2HiNEzzieMolEJV5VbdYmnStYMr1Fbb1Xvueq6kp62UAtszeRYbMnseXSIqtu0lmV69R6GDsqS9cycwzh3wJq0TxnlqDpWHDqSTqPykhR9t42l11dqgjg+313Ek0xRiG6PrMq8UUs2Sl+t/rBhZY3UkpUJrg3F6ZahKSjM5ZOX+0I6nw1rAXJxD13hRsxK+pqVKS7MeUY6VgNialSgcyF4nwozrqjd0WoFXUi2vfIdfDi3LaRujXJjmImloXR8ME/FAbNePSXXT+86VwZgX4ceIzKIZPIA6qUPZgep5R5rxHV+cdnp6/wBf3DlQBiPJ8hGqiVH73aEFdugMS4YxXWIQkEqFuW/vDVZYnAl8b+Jz7ihaAHRLU73dgW6EaHuI9FoQ54ZhMPV6eus8Zz+kUYlNCZMhKC4AWpZe2dRDi3IAD0hulSbXZh7AfcJnXMQAojfh7FErT4BIBL5FKsApraXaB207TuPUvRZxiMaGhWtM7xypLZUobnmBUpOxDBnvZRhPUWhGUJz2T/H18o5RX5rEGKMQkhGgURzzX+kHqbf3CPQq9Q7A8aypKFgrkn4gdUk/mSdj9mOsr5lDXleepb4TiKPCylMokskqAIC0MSg5hdBbY2cEPaM+zaDtxIqpODtGTAp1Aol5a/JsCrTp5SQY4LWRzANUwPAMz4KxJFTTIVMkp8WSpaRMKQXKviUgkeUsA4gHidT02bFf4Tzt/v3/ABj2l2lQcciD8cYL4yPEQPMh35qTyHbUesT4ZqvKbY3R/eNuMjIklh/DU1S0haSlDuS22rXeNe7X1hSVOTIRDnmdgwUhCEoFgAANfnHjtSC7FjGLVzPnE0+plylTZM0DKHKSlBdIuSktqA59PedElD2BLF7+ZiTjAyJyvFcRmTpniTFlamZzsBsALAdo9XRQlSbEGBE7Dk5gqsQIBEFFPOZTdE1TVl9YdrTiBYcz9KnFxHMoxIHEYT1sl4WUZbEOTxM8GxEJXeLaigleITT2ANzLyXickoGmkYBotDTXFqYnqfxqiWjKhN/lHL4UztljAWapB1DKfiaX4KZkxwVvlSBc3Z7kADuYC+gfzCqekGfEK0XLd+0DkVJVNzJU6T+U2V3bQjsdoM1YWvBHMDTrQ9sYz5wSz7wsqlpovYBAJ1q2X/2z/tXDKc6Zs+8Ws/8AtB+vWB1mMqlrd2KfYiC16VbFxFrdSytBKzFDWKTmS2XQwWvTjSg4Mjd/kkEiUOCUqpfNtoz9TYHjiU7OpjxRieVBF3i2i0+WgNTcAMTl+Izi5JJj1NK8YEzFM/YFXTJU0LCSdo7VUpZXtJjFblG3CdrwSrzywqYwJHw8u8eJ1Ne19qTXR2K5MxxNAOkXpJEPuigUY5Q35soTzNJdJyEVNkkcxxR1ypQylIUBo5ILchCdlIsOQcQb5MKFfLmtmmykE/kCk5uxc3MC8l6+lJ+fMheOuYsq5RMwKTZI+HmTo/QQ1WwCYPcZ3ALiKuIsNSqQsl8zMkjXMbBob0d5W0Y6itoypnKqkLlOk3cvlUHFrOOserQrZgj9JgXV4O1hM5dSQQoMlrgM4Pd9osUGMHmUAVepV4Xiy5lPNSslUwJzg6ECWk5QE7puQRtqNGjPs06LYMD6MZrs2qQItl4iVhlXi5oCnKyi6hj3KbA6QeEdA+kZmpsO+a+nx5cYUKkyPNleSoBMxH5pZJbOj+Vz6EsbNFSRbw3f7/7/AHgSvltvXr1nmpwZlG+YapV+pJuFCKm7YcS4q3cxZwXV/wAVCZFpLzELdRPMhbKJ3DA6+YQfxFMIWt+1wRx+nXt+0SpJDYXqXGJTQiStTE5UksHJJbTrGFSpexV95ob9oJMJlSAWgTORChoTVBQlTFJA8RCSQDoSA4BbmzdHgaEF1B6JkO5xxOXcX8VmeiWkIKMpUo+bMC4ADWHX3j1Ph/hwpZmJzn5TN1OoyABJmVWl402qETDkxgspUnrC4yDD4yIlnou0OqeMwJhFJJYhzA7GkAiFVc8M0CrQ5zLM4xiKWu8N+kFuh1DMWtYRnyvYEuz7AtpALQqqWxmXFrdZjSVRqBPjJISkO4+FZdgkKHqTuwOkLGxT9g8n9JY2YGTNP+oKJIVfRglmSkWAybWZrxU0r2P19/vibNu5MPpcRlylB1tuEspS0q1HlAsDbX/K9lD2L1/RlwMEHOI2q66TOleKJqk5TaXkAUQHJyqUoBrG7baGF6qDU21hz+Y+vlNN9TvTd9frJ6p4lmeKmYAghIYJZ7Xtm1JubvvDyaJPLKc8+sTOsu3bjg/KXVLgMuehKwHCgFJPRQcfWMF9Y9LFT6TcSml0D+4jaRwwhADDSFH17NO2oOFkDxLVTjULQFqCUqKQEkgJAtoN+sb+jrrFIYgZIzMLVXWNaRk8HAg0rHp48qwiaAG84dTdwxMFOkq7XI+6QNU+MNz98WT6PxFhaQMiv/E7phlLdi7T3+8Inx8iUdNhyJSQpaWs4cEA9Q+sI2Xsx2rGgABkzThytM6qCSppaQS23IQHWVCqjIHJlNO7W3AE8CW2ITZYD5haMSpXPpNouAOYqosTlqLbnSGrKHAzApcrQqmqZfi5CoPq0Cet/L3AQgcZx6xJxLXkVCAguli7fKHtFSDSS3cVvsIsAEQyp8xNYFS0oUtY8MJI53JB20ueUPlEbTkMSAOYuHItyByZQYbxZTiapM50o0TMAJDh3cByAbNr1jPu8OuKBq+/aMHWpu2/rDqubmmWulLt62H30gFa4Tnsx/ACzn/FeHLUvOzv8R2Tew7x6HQXqq7czE1dTbmeSk1BSSSLfKNVSGHEzlGTD8KmKCydshfsQw+bQG4Dbj5y+cHMPRR+XMCCeULmznBnY9Y2wWsWSE6MNYT1NSgZjumuJO2PsKngzSD5kgMQdFA2UD0ItCNoKoCO5oVEMxBnqVja6V5OULSknIpScxyG6b/P1gyp5oDcf7i29qztEmeFsGmpnTck0ylEK8Ng+YliUqDdMr7OPV3Wait61DLn3/j+4iN6tgcToFMAqllBSioqSgqIIcq3cnTzCPOvldQxAxgn6/KNXnFIBPeITj+Lfg6QVAAMzOgJST8TkZ0v/oCy8C0um/ydQavTBz8vY/niGFmKw33T9jPE8lFGmqS5TPQUITZ/EUksFXtlIU/Yx2m8PtbUmg/8Tk/cPb7+MS1lgCZ95xuvOYWj2dXBmXYcwSnDwV5CiGeHAcy5IEzTIJMWL8QLGfalKkWIIjkIbqUOQYCpZJg4AAkGNKemSRC5Y5hQs0l0THNsm/tFWc4xIK45hCqz+DrcrJuP0JDaf9w+w5XCKv8Aufh+5/1BH7P4/t/7i5c5WocDmHB6X2EMBRK5xP1JTkl2OUXJGgAub8+XOOscD75KLkzRVQSc2gDEJewAsAObCKhABthc55mc5Q+vSLKINp3HgtJTR0+fXwka63S4+UeG8SIbUvt9zN7Tg+QoPtGFdiaUWfW0L1admMZWvHJnLONKgpqV+GhlKyqJVe5SLpT+59o9ZoKSKgLD19dzz+qx5xIEmhOXqpTA7FIv2DRo7U6AgQAe4dh3EcunTMySitahYrbwwQfiykXI2jm0xfGT/cLXYtYOB/UwpcTXdaypZX/8lzd9LnltFLKVJwOMdQXmHOSe+56UVIOdBLK0ULHqDyIioCsNrekuuRyDCKOpWS8xRIfcwOxFAwgjdQJ5aE4zVZAFyix0EC09e87Xh3YLysnZdTUKX4hJB0d9o0jXSq7BF2tbO6UGHzVMVnzHnGdcq52jiXSzPMBlV0xNR4gD5QsB3tnQpD9xmhg0o1Ww+uP0OYMWlbN0ecPcPoSgVFRNQEi6UFSQH2zk/T35Qjq9a5byalOffH7f3GtNpBxZYePruWEiVbNzu8YzN6TUZs9QPE8PCxl5lzBqLipzIK/CZEjD5aJylzZSVKSWluC2mqtlHlbZ43POdqwtbYB7/wBesx7VWpjx90FRSAqtYk36jZveCmzAiAG4xvNwtMoZnbkBuYTXUNYdscehVGREsipyKOqXfUQ61e5feLLlWlHwWjxFqILh27xneJHYozNTSHvmN6+iIWQlRA5PCdV2V5Eb2qeTP//Z',
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
    imageUrl: 'data:image/jpeg;base64,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',
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
