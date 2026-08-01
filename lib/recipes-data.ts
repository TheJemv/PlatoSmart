export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: "Super Easy" | "Easy" | "Medium" | "Hard";
  category: string;
  isPopular?: boolean;
  isOrganic?: boolean;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export const categories = [
  { id: "breakfast", name: "Breakfast", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop", count: 24 },
  { id: "lunch", name: "Lunch", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", count: 32 },
  { id: "dinner", name: "Dinner", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", count: 45 },
  { id: "desserts", name: "Desserts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop", count: 28 },
  { id: "salads", name: "Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", count: 19 },
  { id: "soups", name: "Soups", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", count: 15 },
  { id: "appetizers", name: "Appetizers", image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop", count: 22 },
  { id: "drinks", name: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop", count: 18 },
];

export const recipes: Recipe[] = [
  {
    id: "green-veggies-butter",
    title: "Green Veggies with Flavoured Butter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
    time: "2:35",
    difficulty: "Easy",
    category: "lunch",
    isPopular: true,
    author: { name: "Maggy Dawson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    date: "May 13, 2019",
    servings: 4,
    ingredients: ["500g mixed green vegetables", "100g butter", "Fresh herbs (thyme, rosemary)", "2 cloves garlic", "Salt and pepper to taste", "Lemon zest"],
    instructions: ["Prepare all vegetables by washing and cutting into bite-sized pieces", "Melt butter in a large pan over medium heat", "Add minced garlic and herbs, cook for 1 minute", "Add vegetables and sauté until tender-crisp", "Season with salt, pepper, and lemon zest", "Serve immediately"],
    tags: ["Tips & Tricks", "Healthy", "Vegetarian"]
  },
  {
    id: "baked-sweet-potatoes",
    title: "Baked Sweet Potatoes with Creamy Avocado & Pumpkin",
    description: "Delicious baked sweet potatoes topped with creamy avocado sauce and roasted pumpkin seeds for the perfect healthy meal.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    time: "30 minutes",
    difficulty: "Super Easy",
    category: "dinner",
    author: { name: "Taylor Kenny", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    date: "May 12, 2019",
    servings: 2,
    ingredients: ["2 large sweet potatoes", "1 ripe avocado", "2 tbsp pumpkin seeds", "Olive oil", "Salt and pepper", "Fresh cilantro"],
    instructions: ["Preheat oven to 400°F (200°C)", "Pierce sweet potatoes and bake for 45 minutes", "Mash avocado with lime juice and seasoning", "Split potatoes and top with avocado mixture", "Garnish with pumpkin seeds and cilantro"],
    tags: ["Healthy", "Vegan"]
  },
  {
    id: "french-toast-berries",
    title: "French Toast with Fresh Berries",
    description: "Classic French toast made with brioche bread, topped with fresh seasonal berries and maple syrup.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
    time: "20 minutes",
    difficulty: "Easy",
    category: "breakfast",
    isPopular: true,
    author: { name: "Sarah Miller", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    date: "June 5, 2019",
    servings: 4,
    ingredients: ["4 slices brioche bread", "2 eggs", "1/2 cup milk", "1 tsp vanilla extract", "Mixed berries", "Maple syrup", "Butter for cooking"],
    instructions: ["Whisk eggs, milk, and vanilla together", "Dip bread slices in egg mixture", "Cook in buttered pan until golden on both sides", "Top with fresh berries and maple syrup"],
    tags: ["Breakfast", "Sweet"]
  },
  {
    id: "croissants-homemade",
    title: "Homemade Butter Croissants",
    description: "Flaky, buttery croissants made from scratch. Perfect for a weekend breakfast or brunch.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    time: "3 hours",
    difficulty: "Hard",
    category: "breakfast",
    author: { name: "Pierre Laurent", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    date: "July 20, 2019",
    servings: 12,
    ingredients: ["500g flour", "300g cold butter", "10g salt", "80g sugar", "10g yeast", "300ml milk"],
    instructions: ["Make dough and refrigerate overnight", "Create butter block and laminate dough", "Fold and roll 3 times with resting periods", "Shape croissants and proof", "Bake at 400°F until golden"],
    tags: ["Baking", "French"]
  },
  {
    id: "berry-smoothie-bowl",
    title: "Organic Berry Smoothie Bowl",
    description: "A vibrant and nutritious smoothie bowl packed with organic berries and superfoods.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    time: "10 minutes",
    difficulty: "Super Easy",
    category: "breakfast",
    isOrganic: true,
    author: { name: "Emma Green", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    date: "Aug 3, 2019",
    servings: 1,
    ingredients: ["1 cup frozen mixed berries", "1 banana", "1/2 cup almond milk", "Granola", "Fresh fruits for topping", "Chia seeds"],
    instructions: ["Blend frozen berries, banana, and almond milk", "Pour into bowl", "Top with granola, fresh fruits, and seeds", "Serve immediately"],
    tags: ["Healthy", "Organic", "Vegan"]
  },
  {
    id: "chicken-legs-tomatoes",
    title: "Tender and Crisp Chicken Legs with Tomatoes",
    description: "Perfectly roasted chicken legs with cherry tomatoes, herbs, and a crispy golden skin.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    time: "1 hour",
    difficulty: "Medium",
    category: "dinner",
    isPopular: true,
    author: { name: "Taylor Kenny", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    date: "May 21, 2019",
    servings: 4,
    ingredients: ["4 chicken legs", "2 cups cherry tomatoes", "4 cloves garlic", "Fresh thyme and rosemary", "Olive oil", "Salt and pepper"],
    instructions: ["Season chicken with salt and pepper", "Sear in hot pan until golden", "Add tomatoes and herbs", "Roast at 425°F for 35-40 minutes", "Rest before serving"],
    tags: ["Tips & Tricks", "Protein"]
  },
  {
    id: "pasta-carbonara",
    title: "Classic Italian Carbonara",
    description: "Authentic Roman carbonara with guanciale, pecorino, and perfectly silky eggs.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    time: "25 minutes",
    difficulty: "Medium",
    category: "dinner",
    author: { name: "Marco Rossi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    date: "Sept 15, 2019",
    servings: 4,
    ingredients: ["400g spaghetti", "200g guanciale", "4 egg yolks", "100g pecorino romano", "Black pepper", "Salt"],
    instructions: ["Cook pasta in salted water", "Crisp guanciale in pan", "Mix egg yolks with cheese and pepper", "Combine hot pasta with guanciale", "Add egg mixture off heat, toss quickly", "Serve immediately"],
    tags: ["Italian", "Pasta"]
  },
  {
    id: "avocado-toast",
    title: "Gourmet Avocado Toast",
    description: "Elevated avocado toast with poached egg, microgreens, and everything bagel seasoning.",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
    time: "15 minutes",
    difficulty: "Easy",
    category: "breakfast",
    author: { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
    date: "Oct 8, 2019",
    servings: 2,
    ingredients: ["2 slices sourdough bread", "1 ripe avocado", "2 eggs", "Microgreens", "Everything bagel seasoning", "Red pepper flakes"],
    instructions: ["Toast bread until golden", "Mash avocado with salt and lime", "Poach eggs to desired doneness", "Spread avocado on toast", "Top with poached egg and garnishes"],
    tags: ["Breakfast", "Healthy"]
  },
  {
    id: "chocolate-lava-cake",
    title: "Decadent Chocolate Lava Cake",
    description: "Rich, molten chocolate cake with a gooey center, served with vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
    time: "30 minutes",
    difficulty: "Medium",
    category: "desserts",
    isPopular: true,
    author: { name: "Julia Martinez", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop" },
    date: "Nov 14, 2019",
    servings: 4,
    ingredients: ["200g dark chocolate", "150g butter", "3 eggs", "100g sugar", "50g flour", "Pinch of salt"],
    instructions: ["Melt chocolate and butter together", "Whisk eggs and sugar until fluffy", "Fold in chocolate mixture and flour", "Pour into greased ramekins", "Bake at 425°F for 12-14 minutes", "Serve immediately with ice cream"],
    tags: ["Dessert", "Chocolate"]
  },
  {
    id: "mediterranean-salad",
    title: "Fresh Mediterranean Salad",
    description: "A vibrant salad with crisp vegetables, feta cheese, olives, and tangy lemon dressing.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    time: "15 minutes",
    difficulty: "Super Easy",
    category: "salads",
    author: { name: "Sofia Papadopoulos", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    date: "Dec 2, 2019",
    servings: 4,
    ingredients: ["Mixed greens", "Cherry tomatoes", "Cucumber", "Red onion", "Feta cheese", "Kalamata olives", "Olive oil", "Lemon juice"],
    instructions: ["Chop all vegetables", "Combine in large bowl", "Crumble feta on top", "Dress with olive oil and lemon", "Season and toss gently"],
    tags: ["Salad", "Mediterranean", "Healthy"]
  },
  {
    id: "butternut-squash-soup",
    title: "Creamy Butternut Squash Soup",
    description: "Velvety smooth butternut squash soup with warming spices and a touch of cream.",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop",
    time: "45 minutes",
    difficulty: "Easy",
    category: "soups",
    author: { name: "Anna Wilson", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop" },
    date: "Jan 18, 2020",
    servings: 6,
    ingredients: ["1 butternut squash", "1 onion", "2 cloves garlic", "4 cups vegetable broth", "1/2 cup cream", "Nutmeg, cinnamon"],
    instructions: ["Roast squash until tender", "Sauté onion and garlic", "Add squash and broth, simmer", "Blend until smooth", "Stir in cream and spices", "Serve with crusty bread"],
    tags: ["Soup", "Comfort Food", "Vegetarian"]
  },
  {
    id: "grilled-salmon",
    title: "Grilled Salmon with Herb Butter",
    description: "Perfectly grilled salmon fillet topped with aromatic herb butter and served with roasted vegetables.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    time: "25 minutes",
    difficulty: "Easy",
    category: "dinner",
    author: { name: "James Anderson", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop" },
    date: "Feb 5, 2020",
    servings: 2,
    ingredients: ["2 salmon fillets", "100g butter", "Fresh dill, parsley", "Lemon", "Asparagus", "Cherry tomatoes"],
    instructions: ["Make herb butter with softened butter and herbs", "Season salmon with salt and pepper", "Grill salmon for 4-5 minutes per side", "Top with herb butter while hot", "Serve with grilled vegetables"],
    tags: ["Seafood", "Healthy", "Protein"]
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(recipe => recipe.id === id);
}

export function getRecipesByCategory(categoryId: string): Recipe[] {
  return recipes.filter(recipe => recipe.category === categoryId);
}

export function getPopularRecipes(): Recipe[] {
  return recipes.filter(recipe => recipe.isPopular);
}

export function searchRecipes(query: string): Recipe[] {
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
