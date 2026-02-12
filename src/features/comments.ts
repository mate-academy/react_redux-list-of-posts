/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loaded: false,
    hasError: false,
    items: [] as Comment[],
  },
  reducers: {
    setComments: (state, action: PayloadAction<Comment[] | []>) => {
      state.items = action.payload;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

const {
  actions: { setComments, setError, setLoaded },
} = commentsSlice;

export { setComments, setError, setLoaded };
