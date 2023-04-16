import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  items: Post[],
  hasError: boolean,
  loaded: boolean,
};

const initialState: Props = {
  items: [],
  hasError: false,
  loaded: false,
};

export const loadApiPosts = createAsyncThunk('posts/load', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadApiPosts.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(loadApiPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      });

    builder.addCase(loadApiPosts.rejected, (state) => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
