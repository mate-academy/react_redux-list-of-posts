/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[] | null;
  loaded: boolean;
  hasError: boolean;
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
    setComments: (state, action: PayloadAction<Comment[] | null>) => {
      state.items = action.payload;
    },

    addComments: (state, action: PayloadAction<Comment>) => {
      state.items?.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      if (state.items) {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      }
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { setComments, setLoaded, setError, addComments, removeComment } =
  commentsSlice.actions;
