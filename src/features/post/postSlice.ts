import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { set as setUser } from '../user/userSlice';

type PostState = {
  post: Post | null,
};

const initialState: PostState = {
  post: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    clear: (state) => {
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.type, (state) => {
      state.post = null;

      return state;
    });
  },
});

export default postSlice.reducer;
export const { set, clear } = postSlice.actions;
