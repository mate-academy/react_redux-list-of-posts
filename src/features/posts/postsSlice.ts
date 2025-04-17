import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

// thunk para buscar posts por ID de usuário
export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return {
        ...state,
        items: [],
        loaded: false,
        hasError: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          return {
            ...state,
            items: action.payload,
            loaded: true,
          };
        },
      )
      .addCase(fetchPostsByUser.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
