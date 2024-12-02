import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
