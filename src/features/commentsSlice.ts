import {
  PayloadAction,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type Props = {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
};

const initialState = {
  items: [],
  hasError: false,
  loaded: false,
};

const commentsSlice = createSlice<Props, SliceCaseReducers<Props>, string>({
  name: 'comments',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Comment[]>) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { setItems, setError, setLoaded } = commentsSlice.actions;
