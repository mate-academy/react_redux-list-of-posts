import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

export interface SelectedPostState {
  item: Post | null;
}

const initialState: SelectedPostState = {
  item: null,
};

export const fetchPosts = createAsyncThunk(
  'userPosts/fetchUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.item = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export const selectSelectedPost = (state: RootState) => state.selectedPost.item;

export default selectedPostSlice.reducer;
