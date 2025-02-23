import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const postsInit = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postsInit.pending, state => {
      return { ...state, loading: true }; // Создание нового объекта состояния
    });

    builder.addCase(
      postsInit.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return {
          ...state,
          posts: action.payload,
          loading: false,
        }; // Создание нового объекта состояния
      },
    );

    builder.addCase(postsInit.rejected, state => {
      return {
        ...state,
        loading: false,
        error: 'Error',
      }; // Создание нового объекта состояния
    });
  },
});

export default postsSlice.reducer;
