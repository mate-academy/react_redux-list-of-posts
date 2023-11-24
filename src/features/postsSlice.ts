import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  loaded: boolean,
  hasError: boolean,
  posts: Post[],
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (
      state, action: PayloadAction<Post[]>,
    ) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    addError: (
      state, action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    addLoading: (
      state, action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
  },
});

export default postsSlice.reducer;
export const { addPosts, addError, addLoading } = postsSlice.actions;
