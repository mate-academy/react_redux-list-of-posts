import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    togglePost: (state, action: PayloadAction<Post>) => {
      return state?.id === action.payload.id ? null : action.payload;
    },

    clearSelectedPost: () => null,
  },
});

export const { actions } = selectedPostSlice;
export const selectedPostReducer = selectedPostSlice.reducer;
