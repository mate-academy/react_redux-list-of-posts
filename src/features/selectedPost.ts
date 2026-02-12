import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

// interface SetSelectedPostPayload {
//   post: Post | null;
// }

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

const {
  actions: { setSelectedPost },
} = selectedPostSlice;

export { setSelectedPost };
