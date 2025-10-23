import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";

export const postSlice = createSlice({
  name: 'post',
  initialState: null as Post | null,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      return action.payload;
    }
  }
});

export default postSlice.reducer;
export const { setPost } = postSlice.actions;
