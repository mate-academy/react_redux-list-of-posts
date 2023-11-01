import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  postData: Post | null,
};

const initialState: State = {
  postData: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPostSlice',
  initialState,
  reducers: {
    setPost: (state: State, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line
      state.postData = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setPost } = selectedPostSlice.actions;
