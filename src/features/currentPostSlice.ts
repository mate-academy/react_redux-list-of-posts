import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialPost = null as Post | null;

export const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState: initialPost,
  reducers: {
    set: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});
