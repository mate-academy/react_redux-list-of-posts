import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
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
      const currentState = state;

      currentState.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setLoaded, setError } = postsSlice.actions;
export const postsFromServer = (state: RootState) => state.posts;
