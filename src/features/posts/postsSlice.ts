import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = { items: [] as Post[], loaded: false, hasError: false };

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const { setPosts, setLoaded, setError } = postsSlice.actions;
export default postsSlice.reducer;
