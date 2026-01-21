import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startLoading: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    setError: state => ({
      ...state,
      loaded: true,
      hasError: true,
    }),
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(c => c.id !== action.payload),
    }),
  },
});

export const {
  startLoading,
  setComments,
  setError,
  addComment,
  removeComment,
} = CommentsSlice.actions;
