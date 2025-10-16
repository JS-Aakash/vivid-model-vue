export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discount: string;
  defaultColor: string;
  colors: string[];
  image: string;
  badge?: string;
  features: string[];
  category: string;
  modelPath?: string; // Path to GLB/GLTF 3D model
}

export const products: Product[] = [
  {
    id: 'hypersonic-x1',
    name: 'HyperSonic X1',
    tagline: 'Premium Performance Sneaker',
    price: 299,
    originalPrice: 399,
    discount: '25% OFF',
    defaultColor: '#a855f7',
    colors: ['#a855f7', '#00d9ff', '#ff006e', '#fb923c', '#22c55e', '#6366f1'],
    image: '/placeholder.svg',
    badge: 'New Release',
    category: 'Footwear',
    modelPath: '/models/black_sneakers.glb',
    features: [
      'Advanced cushioning technology',
      'Breathable mesh upper',
      'Ultra-lightweight construction',
      'Premium materials'
    ]
  },
  {
    id: 'velocity-pro',
    name: 'Velocity Pro',
    tagline: 'Elite Racing Edition',
    price: 349,
    originalPrice: 449,
    discount: '22% OFF',
    defaultColor: '#00d9ff',
    colors: ['#00d9ff', '#a855f7', '#22c55e', '#fb923c'],
    image: '/placeholder.svg',
    badge: 'Best Seller',
    category: 'Footwear',
    features: [
      'Carbon fiber plate',
      'Energy return foam',
      'Aerodynamic design',
      'Competition ready'
    ]
  },
  {
    id: 'urban-runner',
    name: 'Urban Runner',
    tagline: 'City Street Essential',
    price: 199,
    originalPrice: 259,
    discount: '23% OFF',
    defaultColor: '#ff006e',
    colors: ['#ff006e', '#6366f1', '#a855f7', '#00d9ff'],
    image: '/placeholder.svg',
    category: 'Footwear',
    features: [
      'All-day comfort',
      'Durable rubber outsole',
      'Reflective details',
      'Versatile style'
    ]
  },
  {
    id: 'sport-watch',
    name: 'ChronoSport Pro',
    tagline: 'Smart Fitness Tracker',
    price: 249,
    originalPrice: 329,
    discount: '24% OFF',
    defaultColor: '#6366f1',
    colors: ['#6366f1', '#a855f7', '#00d9ff', '#22c55e', '#fb923c'],
    image: '/placeholder.svg',
    badge: 'Tech',
    category: 'Accessories',
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant 50m',
      '7-day battery life'
    ]
  },
  {
    id: 'backpack-pro',
    name: 'UrbanPack Elite',
    tagline: 'Premium Travel Backpack',
    price: 179,
    originalPrice: 229,
    discount: '22% OFF',
    defaultColor: '#22c55e',
    colors: ['#22c55e', '#a855f7', '#ff006e', '#6366f1'],
    image: '/placeholder.svg',
    category: 'Accessories',
    features: [
      'Laptop compartment up to 17"',
      'Water-resistant material',
      'Anti-theft design',
      'USB charging port'
    ]
  },
  {
    id: 'gaming-chair',
    name: 'ErgoGamer X',
    tagline: 'Professional Gaming Chair',
    price: 399,
    originalPrice: 549,
    discount: '27% OFF',
    defaultColor: '#a855f7',
    colors: ['#a855f7', '#ff006e', '#00d9ff', '#22c55e'],
    image: '/placeholder.svg',
    badge: 'Hot',
    category: 'Furniture',
    features: [
      'Ergonomic lumbar support',
      'Adjustable armrests',
      'Recline up to 180°',
      'Premium leather finish'
    ]
  },
  {
    id: 'desk-lamp',
    name: 'LumiDesk Pro',
    tagline: 'Smart LED Desk Lamp',
    price: 129,
    originalPrice: 179,
    discount: '28% OFF',
    defaultColor: '#00d9ff',
    colors: ['#00d9ff', '#6366f1', '#fb923c', '#a855f7'],
    image: '/placeholder.svg',
    category: 'Furniture',
    features: [
      'Adjustable color temperature',
      'Touch controls',
      'USB charging port',
      'Memory function'
    ]
  },
  {
    id: 'headphones-pro',
    name: 'AudioMax Elite',
    tagline: 'Noise Cancelling Headphones',
    price: 299,
    originalPrice: 399,
    discount: '25% OFF',
    defaultColor: '#fb923c',
    colors: ['#fb923c', '#a855f7', '#6366f1', '#00d9ff'],
    image: '/placeholder.svg',
    badge: 'Premium',
    category: 'Electronics',
    features: [
      'Active noise cancellation',
      '40-hour battery life',
      'Hi-Res audio certified',
      'Foldable design'
    ]
  },
  {
    id: 'laptop-stand',
    name: 'ElevateDesk',
    tagline: 'Adjustable Laptop Stand',
    price: 89,
    originalPrice: 129,
    discount: '31% OFF',
    defaultColor: '#22c55e',
    colors: ['#22c55e', '#6366f1', '#a855f7'],
    image: '/placeholder.svg',
    category: 'Electronics',
    features: [
      'Aluminum construction',
      '360° rotation',
      'Cable management',
      'Fits laptops up to 17"'
    ]
  },
  {
    id: 'water-bottle',
    name: 'HydroTech Pro',
    tagline: 'Smart Water Bottle',
    price: 59,
    originalPrice: 79,
    discount: '25% OFF',
    defaultColor: '#00d9ff',
    colors: ['#00d9ff', '#22c55e', '#a855f7', '#ff006e'],
    image: '/placeholder.svg',
    category: 'Accessories',
    features: [
      'Temperature display',
      'Hydration reminders',
      'BPA-free stainless steel',
      'Keeps cold 24h, hot 12h'
    ]
  }
];
