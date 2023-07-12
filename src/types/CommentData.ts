import { Comment } from './Comment';

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
