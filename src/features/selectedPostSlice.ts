import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
type SelectedPostState = {
  selectedPostId: number | null;
};
const initialState: SelectedPostState = { selectedPostId: null };
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<number | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPostId = action.payload;
    },
    clearSelectedPost(state) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPostId = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
export const selectSelectedPostId = (state: RootState) =>
  // eslint-disable-next-line no-param-reassign
  state.selectedPost.selectedPostId;
export const selectSelectedPost = (state: RootState) => {
  const selectedId = state.selectedPost.selectedPostId;

  if (selectedId === null) {
    return null;
  }

  return state.posts.items.find(p => p.id === selectedId) ?? null;
};
