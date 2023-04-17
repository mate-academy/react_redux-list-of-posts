import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsSlice = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setHasError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
    setItems: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
    clear: (state) => ({
      ...state,
      items: [],
    }),
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
