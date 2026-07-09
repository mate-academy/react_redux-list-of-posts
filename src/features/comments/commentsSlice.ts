import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
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

export const { setComments, setError, setLoaded } = commentsSlice.actions;

export default commentsSlice.reducer;
