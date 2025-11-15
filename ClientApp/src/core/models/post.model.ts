export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  answersCount: number;
  createdAt: Date;
  updatedAt: Date;
  isAccepted?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  author: string;
  authorId: string;
  postId: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  postId?: string;
  answerId?: string;
  createdAt: Date;
}