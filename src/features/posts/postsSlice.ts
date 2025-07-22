import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchPostsByAuthor = createAsyncThunk(
  'posts/fetchByAuthor',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

type PostsState = {
  author: User | null;
  items: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  author: null,
  items: [],
  selectedPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
      state.selectedPost = null;
      state.items = [];
      state.error = null;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPostsByAuthor.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchPostsByAuthor.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.items = action.payload;
      },
    );

    builder.addCase(fetchPostsByAuthor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Not found posts';
    });
  },
});

export const { setAuthor, setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
