import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
};

const initialAuthor: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialAuthor,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
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

export default commentsSlice.reducer;
export const { setComments, setLoaded, setError } = commentsSlice.actions;
