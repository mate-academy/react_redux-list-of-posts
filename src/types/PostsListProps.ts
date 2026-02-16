import { Post } from './Post';

export interface PostsListProps {
  posts: Post[];
  selectedPostId: number | null;
  onSelectPost: (id: number | null) => void;
}
