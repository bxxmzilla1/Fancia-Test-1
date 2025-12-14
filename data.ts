
import { Model, Chat, Message, MessageSender, MessageType, Post, Subscription } from './types';

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const models: Model[] = [
  {
    id: 1,
    name: 'Seraphina',
    age: 23,
    location: '5 miles away',
    isOnline: true,
    profilePicture: 'https://picsum.photos/seed/seraphina/500/500',
    bannerPicture: 'https://picsum.photos/seed/seraphina-banner/1200/400',
    bio: 'Just a girl exploring the world one city at a time. ✈️ Lover of art, coffee, and deep conversations. DM for exclusives! ✨',
    stats: {
      likes: 1200000,
      comments: 78000,
      views: 23000000,
      posts: 452,
    },
    subscriberCount: 25600,
    subscriptionPrice: 0.75,
  },
  {
    id: 2,
    name: 'Luna',
    age: 21,
    location: '2 miles away',
    isOnline: true,
    profilePicture: 'https://picsum.photos/seed/luna/500/500',
    bannerPicture: 'https://picsum.photos/seed/luna-banner/1200/400',
    bio: 'Fitness enthusiast and gamer girl. 🎮 Let\'s level up together. Sub for workout tips and late-night gaming streams.',
    stats: {
      likes: 850000,
      comments: 45000,
      views: 15000000,
      posts: 310,
    },
    subscriberCount: 19800,
    subscriptionPrice: 0.60,
  },
  {
    id: 3,
    name: 'Aurora',
    age: 25,
    location: '10 miles away',
    isOnline: false,
    profilePicture: 'https://picsum.photos/seed/aurora/500/500',
    bannerPicture: 'https://picsum.photos/seed/aurora-banner/1200/400',
    bio: 'Artist, dreamer, and night owl. 🌙 My gallery is my sanctuary. Subscribe to see my latest creations and inspirations.',
    stats: {
      likes: 2100000,
      comments: 150000,
      views: 45000000,
      posts: 820,
    },
    subscriberCount: 42300,
    subscriptionPrice: 0.90,
  },
  {
    id: 4,
    name: 'Chloe',
    age: 22,
    location: '8 miles away',
    isOnline: true,
    profilePicture: 'https://picsum.photos/seed/chloe/500/500',
    bannerPicture: 'https://picsum.photos/seed/chloe-banner/1200/400',
    bio: 'Fashionista and foodie. Finding beauty in everyday life. 🍜👠 My DMs are open for style advice and recipe swaps!',
    stats: {
      likes: 950000,
      comments: 62000,
      views: 18000000,
      posts: 630,
    },
    subscriberCount: 31000,
    subscriptionPrice: 0.55,
  },
   {
    id: 5,
    name: 'Isabella',
    age: 26,
    location: '15 miles away',
    isOnline: false,
    profilePicture: 'https://picsum.photos/seed/isabella/500/500',
    bannerPicture: 'https://picsum.photos/seed/isabella-banner/1200/400',
    bio: 'Bookworm and aspiring writer. Lost in fictional worlds. 📚 Let\'s talk about our favorite characters.',
    stats: {
      likes: 450000,
      comments: 31000,
      views: 9000000,
      posts: 250,
    },
    subscriberCount: 12500,
    subscriptionPrice: 0.50,
  },
   {
    id: 6,
    name: 'Mia',
    age: 20,
    location: '3 miles away',
    isOnline: true,
    profilePicture: 'https://picsum.photos/seed/mia/500/500',
    bannerPicture: 'https://picsum.photos/seed/mia-banner/1200/400',
    bio: 'Dancer and music lover. Life is a rhythm. 🎶 Sub for exclusive dance clips and my curated playlists.',
    stats: {
      likes: 1500000,
      comments: 95000,
      views: 32000000,
      posts: 550,
    },
    subscriberCount: 38000,
    subscriptionPrice: 0.85,
  },
];

export const posts: Post[] = [
  {
    id: 1,
    modelId: 1,
    type: 'image',
    content: 'https://picsum.photos/seed/post1/800/1000',
    caption: 'Had an amazing photoshoot today! 📸 What do you think of this look?',
    timestamp: '2 hours ago',
    likes: 1200,
    comments: 85,
    isPPV: false,
    isLiked: true,
  },
  {
    id: 2,
    modelId: 1,
    type: 'text',
    content: 'Just thinking about what content to make next. Any suggestions? Drop them in the comments below! 👇',
    timestamp: '5 hours ago',
    likes: 540,
    comments: 150,
    isPPV: false,
    isLiked: false,
  },
  {
    id: 3,
    modelId: 1,
    type: 'image',
    content: 'https://picsum.photos/seed/post2/800/1000',
    caption: 'A little something extra from my latest set. Want to see the rest? 😉',
    timestamp: '1 day ago',
    likes: 2500,
    comments: 210,
    isPPV: true,
    price: 10.00,
    isLiked: false,
  },
   {
    id: 4,
    modelId: 1,
    type: 'image',
    content: 'https://picsum.photos/seed/post3/800/1000',
    caption: 'Lazy Sunday mornings are the best.',
    timestamp: '2 days ago',
    likes: 1800,
    comments: 130,
    isPPV: false,
    isLiked: true,
  },
];

export const chats: Chat[] = [
  {
    id: 1,
    modelId: 1,
    unreadCount: 2,
    messages: [
      { id: 1, sender: MessageSender.MODEL, type: MessageType.TEXT, content: "Hey there! So glad you subscribed. How's your day going?", timestamp: '10:30 AM', isPPV: false },
      { id: 2, sender: MessageSender.USER, type: MessageType.TEXT, content: "It's going great! Just relaxing. How about you?", timestamp: '10:32 AM', isPPV: false },
      { id: 3, sender: MessageSender.MODEL, type: MessageType.MEDIA, content: 'https://picsum.photos/seed/chat1/400/600', timestamp: '10:35 AM', isPPV: true, price: 5.00, isUnlocked: false },
      { id: 4, sender: MessageSender.MODEL, type: MessageType.TEXT, content: "Sent you something special 😉", timestamp: '10:35 AM', isPPV: false },
    ],
  },
  {
    id: 2,
    modelId: 2,
    unreadCount: 0,
    messages: [
      { id: 1, sender: MessageSender.MODEL, type: MessageType.TEXT, content: "Thanks for the sub! Ready to game?", timestamp: 'Yesterday', isPPV: false },
      { id: 2, sender: MessageSender.USER, type: MessageType.TEXT, content: "Always! What are we playing?", timestamp: 'Yesterday', isPPV: false },
    ],
  },
  {
    id: 3,
    modelId: 4,
    unreadCount: 1,
    messages: [
      { id: 1, sender: MessageSender.MODEL, type: MessageType.TEXT, content: "Welcome! You have great taste 😉", timestamp: '3 days ago', isPPV: false },
       { id: 2, sender: MessageSender.USER, type: MessageType.TEXT, content: "Haha, thanks! Love your style.", timestamp: '3 days ago', isPPV: false },
      { id: 3, sender: MessageSender.MODEL, type: MessageType.TEXT, content: "Unlock this message to see my favorite outfit of the week.", timestamp: '11:00 AM', isPPV: true, price: 2.50, isUnlocked: false, },
    ],
  }
];

export const subscriptions: Subscription[] = [
  { modelId: 1, renewalDate: '2024-08-15' },
  { modelId: 3, renewalDate: '2024-08-22' },
  { modelId: 6, renewalDate: '2024-09-01' },
];

export const getModelById = (id: number) => models.find(m => m.id === id);
export const getChatById = (id: number, allChats: Chat[]) => allChats.find(c => c.id === id);
export const getPostsByModelId = (id: number) => posts.filter(p => p.modelId === id);
export const getSubscriptions = () => subscriptions;
