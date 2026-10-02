import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { setAuthor } from './author';

const initialState = null as Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<Post | null>) => action.payload,
  },
  extraReducers: builder => {
    // we clear the post when an author is changed
    // not to confuse the user
    builder.addCase(setAuthor, () => null);
  },
});

export default selectedPostSlice.reducer;
export const { set: setSelectedPost } = selectedPostSlice.actions;
