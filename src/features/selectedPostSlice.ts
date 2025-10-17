import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";

const initialState: Post | null = null;

export const selectedPostSLice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => action.payload,
  },
});

export default selectedPostSLice.reducer;
export const { actions } = selectedPostSLice;
