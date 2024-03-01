import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface SelectedUserState {
  value: User | null;
  userPosts: Post[];
  userPostsLoaded: boolean;
  hasError: boolean;
}

const initialState: SelectedUserState = {
  value: null,
  userPosts: [],
  userPostsLoaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'selectedUser/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    clearSelectedUser: state => {
      state.value = null;
      state.userPosts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.hasError = false;
      state.userPostsLoaded = false;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.hasError = false;
      state.userPostsLoaded = true;
      state.userPosts = action.payload;
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      state.userPostsLoaded = true;
      state.hasError = true;
      state.userPosts = [];
    });
  },
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
