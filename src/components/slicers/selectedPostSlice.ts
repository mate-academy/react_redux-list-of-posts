import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";


export const selectedPostSlice = createSlice({
  name: 'selectedPost',
    initialState:
    {
      selectedPost: null as Post | null,
},
    reducers: {
      setSelectedPost: (state, action: PayloadAction<Post | null>) => {
        state.selectedPost = action.payload;
      },
      },
    },
  )

  export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
