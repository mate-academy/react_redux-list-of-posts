import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsType = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsType = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
    isLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    isError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
