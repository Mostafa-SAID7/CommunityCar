export interface Answer {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  votes?: number;
}
