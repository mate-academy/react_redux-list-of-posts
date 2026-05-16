import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

interface UsersState {
  author: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  author: [],
  loading: false,
  error: null,
};


const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default authorSlice.reducer;
