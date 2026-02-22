import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedPostState = {
  postId: number | null;
};

const initialState: SelectedPostState = {
  postId: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost(state, action: PayloadAction<number | null>) {
      state.postId = action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;

export const selectSelectedPostId = (s: { selectedPost: SelectedPostState }) =>
  s.selectedPost.postId;
