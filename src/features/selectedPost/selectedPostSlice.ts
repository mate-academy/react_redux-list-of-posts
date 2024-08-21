import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostType = { selectedPost: Post | null };

const initialState: SelectedPostType = { selectedPost: null };

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
