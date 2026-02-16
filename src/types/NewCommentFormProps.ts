import { CommentData, PostComment as CommentType } from './Comment';

export interface NewCommentFormProps {
  onSubmit: (data: CommentData) => Promise<CommentType>;
  onCancel?: () => void;
}
