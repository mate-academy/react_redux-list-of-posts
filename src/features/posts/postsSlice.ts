import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  error: string;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  error: '',
};

export const init = createAsyncThunk('fetch/posts', (selectedUser: User) => {
  return getUserPosts(selectedUser.id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.error = 'Something went wrong.';
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
