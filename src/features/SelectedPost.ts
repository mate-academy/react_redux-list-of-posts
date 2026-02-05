import { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { customCreateSlice } from './UsersSlice';

export const selectedPostSlice = customCreateSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    set: (_, action: PayloadAction<Post>) => action.payload,
    clean: () => null,
  },
});
