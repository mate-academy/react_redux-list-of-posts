import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as null | Post,
  reducers: {
    setSelectedPost: (_, action) => action.payload,
  },
});
