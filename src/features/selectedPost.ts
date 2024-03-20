import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SliceType } from '../types/SliceType';
import { Post } from '../types/Post';

type State = {
  selectedPost: Post | null;
};

const initialState: State = {
  selectedPost: null,
};

const selectedPostsSlice = createSlice({
  name: SliceType.SelectedPost,
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
});

export default selectedPostsSlice.reducer;
export const { set } = selectedPostsSlice.actions;
