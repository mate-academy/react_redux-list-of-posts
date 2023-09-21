import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

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
export const { actions } = commentsSlice;
