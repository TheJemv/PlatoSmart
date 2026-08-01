import { Instagram, Twitter, Facebook, Youtube, Globe } from "lucide-react";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  role: string;
  location: string;
  joinedDate: string;
  stats: {
    recipes: number;
    followers: number;
    following: number;
  };
  specialties: string[];
  socialLinks: {
    platform: string;
    url: string;
    icon: typeof Instagram;
  }[];
  featured?: boolean;
}

export const authors: Author[] = [
  {
    id: "maggy-dawson",
    name: "Maggy Dawson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
    bio: "Passionate home cook and food photographer with over 10 years of experience creating delicious recipes. I believe that cooking should be fun, accessible, and bring people together. My recipes focus on fresh ingredients and simple techniques that anyone can master.",
    role: "Head Chef & Food Photographer",
    location: "San Francisco, CA",
    joinedDate: "January 2018",
    stats: {
      recipes: 156,
      followers: 24500,
      following: 342
    },
    specialties: ["Vegetarian", "Healthy Eating", "Food Photography", "Mediterranean"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/maggydawson", icon: Instagram },
      { platform: "Twitter", url: "https://twitter.com/maggydawson", icon: Twitter },
      { platform: "Website", url: "https://maggydawson.com", icon: Globe },
    ],
    featured: true
  },
  {
    id: "taylor-kenny",
    name: "Taylor Kenny",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&h=400&fit=crop",
    bio: "Professional chef with a passion for comfort food and family recipes. After working in restaurants for 15 years, I now focus on sharing recipes that bring warmth and joy to home kitchens around the world.",
    role: "Professional Chef",
    location: "Austin, TX",
    joinedDate: "March 2018",
    stats: {
      recipes: 203,
      followers: 31200,
      following: 189
    },
    specialties: ["Comfort Food", "BBQ", "Southern Cuisine", "Meal Prep"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/taylorkenny", icon: Instagram },
      { platform: "YouTube", url: "https://youtube.com/taylorkenny", icon: Youtube },
      { platform: "Facebook", url: "https://facebook.com/taylorkenny", icon: Facebook },
    ],
    featured: true
  },
  {
    id: "sarah-miller",
    name: "Sarah Miller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=1200&h=400&fit=crop",
    bio: "Baking enthusiast and breakfast specialist. I wake up early every day excited to create new breakfast recipes that make mornings special. From fluffy pancakes to artisan breads, breakfast is my canvas.",
    role: "Baking Specialist",
    location: "Portland, OR",
    joinedDate: "June 2018",
    stats: {
      recipes: 89,
      followers: 15800,
      following: 256
    },
    specialties: ["Baking", "Breakfast", "Pastries", "Bread Making"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/sarahmiller", icon: Instagram },
      { platform: "Twitter", url: "https://twitter.com/sarahmiller", icon: Twitter },
    ]
  },
  {
    id: "pierre-laurent",
    name: "Pierre Laurent",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop",
    bio: "French-trained pastry chef bringing authentic European techniques to home bakers. I specialize in croissants, tarts, and classic French desserts that seem complex but are achievable with the right guidance.",
    role: "Pastry Chef",
    location: "New York, NY",
    joinedDate: "February 2019",
    stats: {
      recipes: 67,
      followers: 28900,
      following: 124
    },
    specialties: ["French Pastry", "Croissants", "Tarts", "Chocolate"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/pierrelaurent", icon: Instagram },
      { platform: "YouTube", url: "https://youtube.com/pierrelaurent", icon: Youtube },
      { platform: "Website", url: "https://pierrelaurent.com", icon: Globe },
    ],
    featured: true
  },
  {
    id: "emma-green",
    name: "Emma Green",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=400&fit=crop",
    bio: "Certified nutritionist and wellness advocate dedicated to creating healthy, delicious recipes. I prove that eating clean doesnt mean sacrificing flavor. All my recipes use whole, organic ingredients.",
    role: "Nutritionist & Recipe Developer",
    location: "Los Angeles, CA",
    joinedDate: "August 2019",
    stats: {
      recipes: 134,
      followers: 42100,
      following: 298
    },
    specialties: ["Healthy Eating", "Vegan", "Organic", "Smoothie Bowls"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/emmagreen", icon: Instagram },
      { platform: "Twitter", url: "https://twitter.com/emmagreen", icon: Twitter },
      { platform: "Facebook", url: "https://facebook.com/emmagreen", icon: Facebook },
      { platform: "Website", url: "https://emmagreen.com", icon: Globe },
    ],
    featured: true
  },
  {
    id: "marco-rossi",
    name: "Marco Rossi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=1200&h=400&fit=crop",
    bio: "Born in Rome, raised in the kitchen. I bring authentic Italian flavors to your home with recipes passed down through generations. From perfect pasta to traditional risottos, taste Italy in every bite.",
    role: "Italian Cuisine Expert",
    location: "Chicago, IL",
    joinedDate: "April 2019",
    stats: {
      recipes: 112,
      followers: 35600,
      following: 167
    },
    specialties: ["Italian Cuisine", "Pasta", "Risotto", "Pizza"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/marcorossi", icon: Instagram },
      { platform: "YouTube", url: "https://youtube.com/marcorossi", icon: Youtube },
    ]
  },
  {
    id: "lisa-chen",
    name: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop",
    bio: "Food blogger and recipe developer specializing in quick, weeknight meals. As a busy mom of two, I understand the need for recipes that are both delicious and practical. Real food for real life.",
    role: "Food Blogger",
    location: "Seattle, WA",
    joinedDate: "October 2019",
    stats: {
      recipes: 178,
      followers: 19200,
      following: 445
    },
    specialties: ["Quick Meals", "Family Cooking", "Asian Fusion", "Meal Planning"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/lisachen", icon: Instagram },
      { platform: "Twitter", url: "https://twitter.com/lisachen", icon: Twitter },
      { platform: "Website", url: "https://lisachen.com", icon: Globe },
    ]
  },
  {
    id: "julia-martinez",
    name: "Julia Martinez",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&h=400&fit=crop",
    bio: "Dessert artist and chocolate connoisseur. I create stunning desserts that taste as good as they look. From elegant cakes to decadent truffles, I believe every meal deserves a sweet ending.",
    role: "Pastry Artist",
    location: "Miami, FL",
    joinedDate: "December 2019",
    stats: {
      recipes: 95,
      followers: 52300,
      following: 201
    },
    specialties: ["Desserts", "Chocolate", "Cakes", "Food Styling"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/juliamartinez", icon: Instagram },
      { platform: "YouTube", url: "https://youtube.com/juliamartinez", icon: Youtube },
      { platform: "Facebook", url: "https://facebook.com/juliamartinez", icon: Facebook },
    ],
    featured: true
  },
  {
    id: "sofia-papadopoulos",
    name: "Sofia Papadopoulos",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&h=400&fit=crop",
    bio: "Mediterranean food lover bringing the flavors of Greece to your kitchen. My recipes celebrate fresh ingredients, olive oil, and the simple pleasures of Mediterranean cooking.",
    role: "Mediterranean Cuisine Specialist",
    location: "Boston, MA",
    joinedDate: "January 2020",
    stats: {
      recipes: 76,
      followers: 18700,
      following: 312
    },
    specialties: ["Mediterranean", "Greek Cuisine", "Salads", "Seafood"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/sofiapapadopoulos", icon: Instagram },
      { platform: "Twitter", url: "https://twitter.com/sofiapapadopoulos", icon: Twitter },
    ]
  },
  {
    id: "anna-wilson",
    name: "Anna Wilson",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=1200&h=400&fit=crop",
    bio: "Comfort food enthusiast and soup specialist. Nothing warms the soul like a bowl of homemade soup, and I am here to share my collection of cozy, heartwarming recipes for every season.",
    role: "Comfort Food Creator",
    location: "Denver, CO",
    joinedDate: "March 2020",
    stats: {
      recipes: 64,
      followers: 12400,
      following: 278
    },
    specialties: ["Soups", "Comfort Food", "Stews", "One-Pot Meals"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/annawilson", icon: Instagram },
      { platform: "Facebook", url: "https://facebook.com/annawilson", icon: Facebook },
    ]
  },
  {
    id: "james-anderson",
    name: "James Anderson",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&h=400&fit=crop",
    bio: "Seafood specialist and grilling master. From perfectly seared salmon to grilled lobster, I help home cooks overcome their fear of cooking fish and create restaurant-quality seafood dishes at home.",
    role: "Seafood & Grill Expert",
    location: "San Diego, CA",
    joinedDate: "May 2020",
    stats: {
      recipes: 88,
      followers: 21800,
      following: 156
    },
    specialties: ["Seafood", "Grilling", "BBQ", "Healthy Proteins"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/jamesanderson", icon: Instagram },
      { platform: "YouTube", url: "https://youtube.com/jamesanderson", icon: Youtube },
      { platform: "Website", url: "https://jamesanderson.com", icon: Globe },
    ]
  }
];

export function getAuthorById(id: string): Author | undefined {
  return authors.find(author => author.id === id);
}

export function getAuthorByName(name: string): Author | undefined {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return authors.find(author => author.id === slug);
}

export function getFeaturedAuthors(): Author[] {
  return authors.filter(author => author.featured);
}

export function formatFollowers(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}
