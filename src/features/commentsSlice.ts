import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setCommentsLoading: state => {
      state.loaded = false;
      state.hasError = false;
    },
    setCommentsError: state => {
      state.loaded = true;
      state.hasError = true;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
});

export const {
  setComments,
  setCommentsLoading,
  setCommentsError,
  addComment,
  removeComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
