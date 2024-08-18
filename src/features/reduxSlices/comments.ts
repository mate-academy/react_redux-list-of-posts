import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};
const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoaded(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    setComments(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
});

export const { setLoaded, setError, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
