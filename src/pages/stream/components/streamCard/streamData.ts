export interface StreamData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedDate: {
    day: string;
    month: string;
    year: number;
  };
  badge?: string;
  primaryAction: {
    label: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
}

export const sampleCards: StreamData[] = [
  {
    id: '1',
    title: 'Plan First, Code Later: System Architecture with AI',
    description: 'Blueprint your logic and let AI handle the boilerplate. System architecture design is your foundational blueprint defining system structure and behavior before coding.',
    // Updated with a verified working image URL
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    author: {
      name: 'Madhusudan K S',
      avatar: 'https://i.pravatar.cc/150?img=11' 
    },
    publishedDate: {
      day: '2',
      month: 'Jun',
      year: 2026
    },
    badge: 'Architecture',
    primaryAction: { label: 'Read More' },
    secondaryAction: { label: 'Share' }
  },
  {
    id: '2',
    title: 'Proxy vs Reverse Proxy vs Load Balancer vs API Gateway',
    description: 'Understand how proxies, reverse proxies, load balancers, and API gateways work together in modern backend architectures. Each layer has a clear responsibility.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    author: {
      name: 'Madhusudan K S',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    publishedDate: {
      day: '16',
      month: 'Dec',
      year: 2025
    },
    badge: 'System Design',
    primaryAction: { label: 'Read More' },
    secondaryAction: { label: 'Share' }
  },
  {
    id: '3',
    title: 'Stop Storing JWTs in localStorage: Use HttpOnly Cookies for Secure Authentication',
    description: 'JWT authentication is great for stateless apps, but only if stored securely. Stop relying on localStorage and switch to HttpOnly cookies to protect against XSS vulnerabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    author: {
      name: 'Madhusudan K S',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    publishedDate: {
      day: '23',
      month: 'Aug',
      year: 2025
    },
    badge: 'Security',
    primaryAction: { label: 'Read More' },
    secondaryAction: { label: 'Share' }
  },
  {
    id: '4',
    title: 'AI Prompting for Developers: Mastering the Art of Asking Better Questions',
    description: 'You don’t need to prompt like a prompt engineer. Treat the AI like a helpful teammate—give context, be clear, and collaborate iteratively to code smarter.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    author: {
      name: 'Madhusudan K S',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    publishedDate: {
      day: '5',
      month: 'May',
      year: 2025
    },
    badge: 'AI & Dev',
    primaryAction: { label: 'Read More' },
    secondaryAction: { label: 'Share' }
  }
];
