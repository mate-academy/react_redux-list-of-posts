/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/Post";
import { getUserPosts } from "../api/posts";
// import { useSelector } from "react-redux";
// import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";

export type UserPost = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
  
}

const initialState: UserPost = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
}

export const PostsContext = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts:(state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<Post>) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(posts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(posts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    })
    builder.addCase(posts.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    })
  }
});


export const {
  setPosts, setSelectedPost 
} = PostsContext.actions;
export default PostsContext.reducer;

const userSelect = useAppSelector(state => state.selectedUser.selectedUser?.id)

export const posts = createAsyncThunk(`/posts?userId=${userSelect}`, (userSelect: number ) => {
  
  // if (selectedUserId) {
    return getUserPosts(userSelect);
  // }
})