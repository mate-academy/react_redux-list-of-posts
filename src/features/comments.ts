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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
    setLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
    add: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    remove: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(item => item.id !== action.payload),
    }),
    clear: () => initialState,
  },
});

export const {
  set: setComments,
  setLoaded: setCommentsLoaded,
  setError: setCommentsError,
  add: addComment,
  remove: removeComment,
  clear: clearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
