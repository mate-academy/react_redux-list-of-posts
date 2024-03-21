import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface State {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: State = {
  items: [],
  loaded: true,
  hasError: false,
};

/* eslint-disable */
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },

    addItem: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    clearItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});
/* eslint-enable */

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
