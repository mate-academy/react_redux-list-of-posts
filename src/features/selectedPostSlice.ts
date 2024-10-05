import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';

const initialState = null as Post | null;

export const { reducer, actions } = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const selectedPostSelector = (state: RootState) => state.selectedPost;
