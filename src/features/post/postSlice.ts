import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, actions) => {
      state.items = actions.payload;
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

export const { setPosts, setError, setLoading } = postSlice.actions;
export default postSlice.reducer;
