import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

// export const init = createAsyncThunk('user/loadUser',
//   async () => getUsers());

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      return { ...state, selectedPost: action.payload };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(init.fulfilled, (state, action) => {
  //     return { ...state, users: action.payload };
  //   });
  // },
});

export default selectedPostSlice.reducer;
