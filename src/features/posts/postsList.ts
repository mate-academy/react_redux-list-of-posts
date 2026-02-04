import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type UserState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UserState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      loaded: true,
    }));

    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: false,
    }));

    builder.addCase(init.rejected, state => ({
      ...state,
      loaded: false,
      hasError: true,
    }));
  },
});
