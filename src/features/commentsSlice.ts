import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface PostsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload,
      };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload,
        ],
      };
    },
    removeComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload.id,
        ),
      };
    },
    clearComments: (state) => {
      return {
        ...state,
        selectedPost: null,
      };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  addComment,
  removeComment,
  clearComments,
  setError,
  setLoaded,
} = commentsSlice.actions;

export const loadComments = (postId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoaded(false));
    dispatch(setError(false));

    try {
      const commentsFromServer = await commentsApi.getPostComments(postId);

      dispatch(setComments(commentsFromServer));
    } catch {
      dispatch(setError(true));
    } finally {
      dispatch(setLoaded(true));
    }
  };
};

export const addNewComment = (
  { name, email, body }: CommentData,
  postID: number,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: postID,
      });

      dispatch(addComment(newComment));
    } catch (error) {
      dispatch(setError(true));
    }
  };
};

export const deleteComment = (comment: Comment) => {
  return async (dispatch: Dispatch) => {
    dispatch(removeComment(comment));

    await commentsApi.deleteComment(comment.id);
  };
};
