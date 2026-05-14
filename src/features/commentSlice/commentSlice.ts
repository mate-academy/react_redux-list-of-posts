import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    items: [] as Comment[],
    loaded: false,
    hasError: false,
  },
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    },
    setError: state => {
      state.hasError = true;
      state.loaded = true;
    },
    setLoading: state => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    },
  },
});

export const { setComments, setError, setLoading } = commentSlice.actions;
export default commentSlice.reducer;
