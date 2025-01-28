import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts, getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await getPosts();

    return response;
  },
);

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async userId => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchPosts.rejected, state => {
        return { ...state, loaded: false, hasError: true };
      })
      .addCase(fetchUserPosts.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          return { ...state, loaded: true, items: action.payload };
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        return { ...state, loaded: false, hasError: true };
      });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
