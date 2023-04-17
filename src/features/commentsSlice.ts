import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, actions: PayloadAction<Comment[]>) => ({
      ...state,
      items: actions.payload,
    }),
    add: (state, actions: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, actions.payload],
    }),
    delete: (state, actions: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(item => item.id !== actions.payload),
    }),
    setLoaded: (state, actions: PayloadAction<boolean>) => ({
      ...state,
      loaded: actions.payload,
    }),
    setHasError: (state, actions: PayloadAction<boolean>) => ({
      ...state,
      hasError: actions.payload,
    }),
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
