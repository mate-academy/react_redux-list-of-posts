import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsType = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
    add: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    delete: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
    isLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    isError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
