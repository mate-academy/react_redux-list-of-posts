import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },

    setCommentsLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    resetComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const {
  setComments,
  addComment,
  removeComment,
  setCommentsLoaded,
  setCommentsError,
  resetComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
