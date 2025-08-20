export interface User {
  id: string;
  address: string;
  username: string;
  bio: string;
  avatar: string;
  tokenBalance: string;
  joinedAt: Date;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  contentType: 'article' | 'image' | 'video';
  contentUrl: string;
  author: User;
  tokenId?: string;
  transactionHash?: string;
  upvotes: number;
  tips: number;
  createdAt: Date;
  tags: string[];
  metadata?: {
    size?: number;
    duration?: number;
    mimeType?: string;
  };
}

export interface Vote {
  id: string;
  contentId: string;
  userId: string;
  amount: number;
  timestamp: Date;
}