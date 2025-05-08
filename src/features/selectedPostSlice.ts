import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface SelectedPost {
  post: Post | null;
}

const initialState: SelectedPost = {
  post: null,
};

export const init = createAsyncThunk(
  'selectedPost/fetchSelectedPost',
  async (id: number) => {
    const user = await getUserPosts(id);

    return user;
  },
);

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
    clearPost: state => {
      state.post = null;
    },
  },
});

export const { setPost, clearPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
