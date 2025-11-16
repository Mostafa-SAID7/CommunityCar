export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  tags?: string[];
  groupId?: string;
}
