import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialStateType = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    removePost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.payload.id),
      };
    },
    clearPosts: state => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      return {
        ...state,
        hasError: false,
        loaded: false,
      };
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });

    builder.addCase(loadPosts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});

export default postsSlice.reducer;
