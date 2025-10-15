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
    features: [
      'All-day comfort',
      'Durable rubber outsole',
      'Reflective details',
      'Versatile style'
    ]
  },
  {
    id: 'trail-blazer',
    name: 'Trail Blazer',
    tagline: 'Off-Road Adventure',
    price: 279,
    originalPrice: 359,
    discount: '22% OFF',
    defaultColor: '#22c55e',
    colors: ['#22c55e', '#fb923c', '#a855f7', '#6366f1'],
    image: '/placeholder.svg',
    badge: 'New',
    features: [
      'Aggressive traction',
      'Water-resistant upper',
      'Protective toe cap',
      'Rugged construction'
    ]
  },
  {
    id: 'cloud-walker',
    name: 'Cloud Walker',
    tagline: 'Maximum Comfort Series',
    price: 229,
    originalPrice: 299,
    discount: '23% OFF',
    defaultColor: '#6366f1',
    colors: ['#6366f1', '#a855f7', '#00d9ff', '#22c55e'],
    image: '/placeholder.svg',
    features: [
      'Plush cushioning',
      'Memory foam insole',
      'Soft knit upper',
      'Everyday comfort'
    ]
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    tagline: 'Track Performance',
    price: 399,
    originalPrice: 499,
    discount: '20% OFF',
    defaultColor: '#fb923c',
    colors: ['#fb923c', '#ff006e', '#00d9ff', '#a855f7'],
    image: '/placeholder.svg',
    badge: 'Pro Series',
    features: [
      'Sprint optimized',
      'Lightweight design',
      'Responsive cushioning',
      'Professional grade'
    ]
  }
];
