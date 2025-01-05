import type { SearchResult } from '../../types/searchResult';

export const laptops: SearchResult = {
  title: "MacBook Pro 14 M3",
  description: "Professional laptop with exceptional performance and battery life powered by M3 chip.",
  confidence: 91,
  imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
  specifications: {
    "Processor": "Apple M3 Pro",
    "Memory": "16GB Unified",
    "Storage": "512GB SSD",
    "Display": "14.2-inch Liquid Retina XDR",
    "Battery": "Up to 18 hours",
    "Weight": "1.55 kg"
  },
  sources: [
    {
      platform: "expert",
      content: "The M3 chip delivers unprecedented performance per watt.",
      expertise: "Hardware Engineer",
      author: "Dr. James Wilson",
      url: "https://example.com"
    },
    {
      platform: "stackoverflow",
      content: "Excellent development machine, especially for native ARM compilation.",
      votes: 324,
      author: "dev_expert",
      url: "https://stackoverflow.com"
    }
  ]
};