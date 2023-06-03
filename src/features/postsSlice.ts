import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/RootState';
import { Post } from '../types/Post';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
};

const initialAuthor: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialAuthor,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setLoaded, setError } = postsSlice.actions;
export const postsFromServer = (state: RootState) => state.posts;
