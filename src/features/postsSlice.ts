import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type Props = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postSlice = createSlice<Props, SliceCaseReducers<Props>, string>({
  name: 'posts',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Post[]>) {
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

export default postSlice.reducer;
export const { setItems, setLoaded, setError } = postSlice.actions;
