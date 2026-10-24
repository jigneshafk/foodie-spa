// Static menu data. Emoji are used as "photos" so the app works fully offline.
export const CATEGORIES = ["All", "Starters", "Mains", "Pizza", "Desserts", "Drinks"];

export const MENU = [
  { id: 1, name: "Paneer Tikka", category: "Starters", price: 220, veg: true, rating: 4.6, emoji: "🧆", time: 20, desc: "Char-grilled cottage cheese cubes marinated in spiced yogurt, served with mint chutney." },
  { id: 2, name: "Chicken 65", category: "Starters", price: 260, veg: false, rating: 4.5, emoji: "🍗", time: 18, desc: "Crispy South-Indian style fried chicken tossed with curry leaves and green chillies." },
  { id: 3, name: "Veg Spring Rolls", category: "Starters", price: 180, veg: true, rating: 4.2, emoji: "🥟", time: 15, desc: "Golden rolls stuffed with crunchy vegetables and glass noodles." },
  { id: 4, name: "Butter Chicken", category: "Mains", price: 340, veg: false, rating: 4.8, emoji: "🍛", time: 25, desc: "Tender chicken in a velvety tomato-butter gravy. Best with naan." },
  { id: 5, name: "Dal Makhani", category: "Mains", price: 240, veg: true, rating: 4.7, emoji: "🥘", time: 22, desc: "Black lentils slow-cooked overnight with cream and butter." },
  { id: 6, name: "Veg Biryani", category: "Mains", price: 280, veg: true, rating: 4.4, emoji: "🍚", time: 30, desc: "Fragrant basmati layered with vegetables, saffron and fried onions." },
  { id: 7, name: "Hyderabadi Chicken Biryani", category: "Mains", price: 360, veg: false, rating: 4.9, emoji: "🍲", time: 35, desc: "Dum-cooked biryani with marinated chicken and whole spices." },
  { id: 8, name: "Margherita Pizza", category: "Pizza", price: 299, veg: true, rating: 4.3, emoji: "🍕", time: 20, desc: "Classic hand-tossed pizza with mozzarella, basil and tomato sauce." },
  { id: 9, name: "Farmhouse Pizza", category: "Pizza", price: 389, veg: true, rating: 4.5, emoji: "🫓", time: 22, desc: "Loaded with capsicum, mushroom, onion, sweet corn and olives." },
  { id: 10, name: "Pepperoni Pizza", category: "Pizza", price: 429, veg: false, rating: 4.6, emoji: "🍕", time: 22, desc: "Spicy pepperoni slices over a bubbling mozzarella base." },
  { id: 11, name: "Gulab Jamun", category: "Desserts", price: 110, veg: true, rating: 4.7, emoji: "🍡", time: 8, desc: "Soft milk dumplings soaked in warm rose-cardamom syrup." },
  { id: 12, name: "Chocolate Brownie", category: "Desserts", price: 150, veg: true, rating: 4.6, emoji: "🍫", time: 10, desc: "Fudgy brownie served warm with a scoop of vanilla ice cream." },
  { id: 13, name: "Mango Lassi", category: "Drinks", price: 90, veg: true, rating: 4.5, emoji: "🥭", time: 5, desc: "Chilled yogurt smoothie blended with ripe Alphonso mangoes." },
  { id: 14, name: "Cold Coffee", category: "Drinks", price: 120, veg: true, rating: 4.3, emoji: "🧋", time: 6, desc: "Thick, creamy iced coffee topped with chocolate drizzle." },
];

export const COUPONS = {
  FOODIE10: { type: "percent", value: 10, label: "10% off" },
  WELCOME50: { type: "flat", value: 50, label: "₹50 off" },
};
