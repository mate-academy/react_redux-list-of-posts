import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { createAppSlice } from '../../app/createAppSlice';

export interface CommentSliceState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentSliceState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createAppSlice({
  name: 'comments',
  initialState,
  reducers: create => ({
    loadPostComments: create.asyncThunk(
      async (postId: number) => {
        const comments = await getPostComments(postId);

        return comments;
      },
      {
        pending: state => {
          return {
            ...state,
            loaded: false,
            hasError: false,
          };
        },
        fulfilled: (state, action) => {
          return {
            ...state,
            loaded: true,
            comments: action.payload,
          };
        },
        rejected: state => {
          return {
            ...state,
            loaded: true,
            hasError: true,
          };
        },
      },
    ),
    addComment: create.asyncThunk(
      async (data: Omit<Comment, 'id'>) => {
        const response = await createComment(data);

        return response;
      },
      {
        pending: state => {
          return {
            ...state,
            hasError: false,
          };
        },
        fulfilled: (state, action) => {
          return {
            ...state,
            comments: [...state.comments, action.payload],
          };
        },
        rejected: state => {
          return {
            ...state,
            hasError: true,
          };
        },
      },
    ),
    removeComment: create.asyncThunk(
      async (commentId: number) => {
        await deleteComment(commentId);

        return commentId;
      },
      {
        pending: state => {
          return {
            ...state,
            hasError: false,
          };
        },
        fulfilled: (state, action) => {
          return {
            ...state,

            comments: state.comments.filter(
              comment => comment.id !== action.payload,
            ),
          };
        },
        rejected: state => {
          return {
            ...state,

            hasError: true,
          };
        },
      },
    ),
  }),
});
