import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../types/User";
import {Post} from "../types/Post";
import {getUserPosts} from "../api/posts";

export type currentUserState = {
  currentUser: User | null,
  userPostsLoading: boolean,
  currentUserPosts: Post[],

};

const initialState: currentUserState = {
  currentUser: null,
  userPostsLoading: false,
  currentUserPosts: [],
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(userPostsInit.pending, (state) => {
      state.userPostsLoading = true;
    })
    .addCase(userPostsInit.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUserPosts = action.payload;
          state.userPostsLoading = false;
        }
    })
  }
});

export default currentUserSlice.reducer;
export const { actions } = currentUserSlice;

export const userPostsInit = createAsyncThunk('userPosts/fetch', (userId: number) => {
  return getUserPosts(userId);
})


