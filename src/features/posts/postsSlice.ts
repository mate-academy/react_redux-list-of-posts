import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts } from '../../api/posts';

export const postsThunks = createAsyncThunk('posts/getPosts', async () => {
  const postsFetch = await getPosts();

  return postsFetch;
});

type PostState = {
  currentPost: Post | null,
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: PostState = {
  currentPost: null,
  posts: [],
  loading: false,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload; // eslint-disable-line
    },

    setPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload; // eslint-disable-line
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postsThunks.pending, // eslint-disable-line
      (state) => {
        state.loading = false; // eslint-disable-line
      });

    builder.addCase(postsThunks.fulfilled, // eslint-disable-line
      (state, action) => {
        state.posts = action.payload; // eslint-disable-line
        state.loading = true; // eslint-disable-line
      });

    builder.addCase(postsThunks.rejected, (state) => { // eslint-disable-line
      state.loading = false; // eslint-disable-line
      state.error = 'Something went wrong!'; // eslint-disable-line
    });
  },
});

export const { setPosts, setPost } = postsSlice.actions;
export default postsSlice.reducer;
