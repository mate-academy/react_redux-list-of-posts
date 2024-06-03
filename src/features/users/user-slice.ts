import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { Post } from '../../types/Post';

export type UserState = {
  author: User | null;
  post: Post | null;
  posts: Post[] | [];
};

const initialState: UserState = {
  author: null,
  post: null,
  posts: [],
};

const userSelectSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      const currentState = state;

      currentState.author = action.payload;
    },
    setPost: (state, action: PayloadAction<Post | null>) => {
      const currentState = state;

      currentState.post = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      const currentState = state;

      currentState.posts = action.payload;
    },
  },
});

export const { setAuthor, setPost, setPosts } = userSelectSlice.actions;
export default userSelectSlice.reducer;
