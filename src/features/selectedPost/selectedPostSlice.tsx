import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostState {
  selectedPost: Post | null;
  isLoading: boolean;
}

const initialState: PostState = {
  selectedPost: null,
  isLoading: false,
};

const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = null;
    },
    setLoading: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
  },
});

export const { selectPost, clearSelectedPost, setLoading } =
  selectedPostSlice.actions;

export default selectedPostSlice.reducer;
