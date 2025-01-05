import type { SearchResult } from '../../types/searchResult';

export const smartphones: SearchResult = {
  title: "iPhone 15 Pro",
  description: "Latest flagship smartphone with advanced camera system and powerful A17 Pro chip.",
  confidence: 92,
  imageUrl: "https://images.unsplash.com/photo-1696423736981-e9bcf8cf2238?auto=format&fit=crop&q=80&w=1000",
  specifications: {
    "Processor": "A17 Pro",
    "Display": "6.1-inch OLED",
    "Camera": "48MP Main",
    "Storage": "256GB",
    "Battery": "3,274 mAh",
    "OS": "iOS 17"
  },
  sources: [
    {
      platform: "expert",
      content: "The A17 Pro chip sets new standards for mobile computing performance.",
      expertise: "Tech Analyst",
      author: "Sarah Chen",
      url: "https://example.com"
    },
    {
      platform: "youtube",
      content: "Camera improvements are significant, especially in low light conditions.",
      author: "TechReviewPro",
      url: "https://youtube.com"
    }
  ]
};