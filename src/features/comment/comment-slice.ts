/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      const idtoRemove = action.payload;

      state.items = state.items.filter(comment => comment.id !== idtoRemove);
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
      setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
     setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { setComments, removeComment, addComment, setError, setLoaded } = CommentsSlice.actions;

export default CommentsSlice.reducer;
