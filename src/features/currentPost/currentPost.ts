import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const postThunk = createAsyncThunk('post/getUserPosts',
  async (userId: number) => {
    const fetch = await getUserPosts(userId);

    return fetch;
  });

type PostSlice = {
  currentPost: Post | null,
  postId: Post[],
  loading: boolean,
  error: string,
};

const initialState: PostSlice = {
  currentPost: null,
  postId: [],
  loading: false,
  error: '',
};

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload || null; // eslint-disable-line
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postThunk.pending, // eslint-disable-line
      (state) => {
        state.loading = true; // eslint-disable-line
      });

    builder.addCase(postThunk.fulfilled, // eslint-disable-line
      (state, action) => {
        state.postId = action.payload; // eslint-disable-line
        state.loading = false; // eslint-disable-line
      });

    builder.addCase(postThunk.rejected, (state) => { // eslint-disable-line
      state.loading = false; // eslint-disable-line
      state.error = 'Something went wrong!'; // eslint-disable-line
    });
  },
});

export const { setPost } = currentPostSlice.actions;
export default currentPostSlice.reducer;
