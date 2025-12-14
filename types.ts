
export interface Model {
  id: number;
  name: string;
  age: number;
  location: string;
  isOnline: boolean;
  profilePicture: string;
  bannerPicture: string;
  bio: string;
  stats: {
    likes: number;
    comments: number;
    views: number;
    posts: number;
  };
  subscriberCount: number;
  subscriptionPrice: number;
}

export interface Post {
  id: number;
  modelId: number;
  type: 'text' | 'image' | 'video';
  content: string;
  caption?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isPPV: boolean;
  price?: number;
  isPinned?: boolean;
  isLiked?: boolean;
}

export enum MessageType {
  TEXT = 'TEXT',
  MEDIA = 'MEDIA',
}

export enum MessageSender {
  USER = 'USER',
  MODEL = 'MODEL',
}

export interface Message {
  id: number;
  sender: MessageSender;
  type: MessageType;
  content: string;
  timestamp: string;
  isPPV: boolean;
  price?: number;
  isUnlocked?: boolean;
}

export interface Chat {
  id: number;
  modelId: number;
  messages: Message[];
  unreadCount: number;
}

export interface Subscription {
  modelId: number;
  renewalDate: string;
}
