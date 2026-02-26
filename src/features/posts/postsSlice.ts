import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';


export interface Posts {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
}


const initialState: Posts = {
  posts: [],
  loaded: false,
  hasError: false,
}

export const fetchUserPosts = createAsyncThunk('posts/fetch', (userId: number) => getUserPosts(userId));


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    })
  }
});

export default postsSlice.reducer;
