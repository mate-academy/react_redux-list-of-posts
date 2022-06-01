import { Comment } from './Comment';

export type CommentsState = {
  selectedPostComments: Comment[],
  isCommentsVisible: boolean,
  isDeleteCommentLoading: boolean,
  deleteTargets: number[],
  inputName: string,
  inputEmail: string,
  inputComment: string,
  isEmailValid: boolean,
  isSubmitted: boolean,
  isAddCommentLoading: boolean,
};
