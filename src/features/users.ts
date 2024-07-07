import {
  Slice,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUserPosts } from '../api/posts';

export const changeAsync = createAsyncThunk(
  'posts/fetchPost',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const usersSlice: Slice<UsersState> = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      /* eslint-disable-next-line no-param-reassign */
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
