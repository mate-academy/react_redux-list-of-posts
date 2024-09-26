import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'author',
  initialState,

  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const selectedPostActions = selectedPostSlice.actions;
