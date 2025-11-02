// src/slices/postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as postsApi from '../api/posts';
import { Post } from '../types/Post';

export type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
  errorMessage?: string | null;
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
  errorMessage: null,
};

function getErrorMessage(err: unknown, fallback = 'Unknown error'): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  try {
    const s = JSON.stringify(err);

    return s === '{}' ? fallback : s;
  } catch {
    return fallback;
  }
}

export const fetchPostsByUser = createAsyncThunk<
  Post[],
  number,
  { rejectValue: string }
>('posts/fetchByUser', async (userId, { rejectWithValue }) => {
  if (typeof userId !== 'number' || Number.isNaN(userId)) {
    return rejectWithValue('Invalid userId');
  }

  try {
    const data = await postsApi.getUserPosts(userId);

    return data as Post[];
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to fetch posts'));
  }
});

export const fetchAllPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await postsApi.getPosts();

    return data as Post[];
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to fetch posts'));
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(_state, action: PayloadAction<Post[]>) {
      return {
        ...initialState,
        items: action.payload,
        loaded: true,
      } as PostsState;
    },
    clearPosts() {
      return { ...initialState };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
          errorMessage: null,
          items: [],
        };
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (_state, action: PayloadAction<Post[]>) => {
          return {
            ...initialState,
            items: action.payload,
            loaded: true,
            hasError: false,
            errorMessage: null,
          };
        },
      )
      .addCase(fetchPostsByUser.rejected, (_state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to fetch posts';

        return {
          ...initialState,
          loaded: true,
          hasError: true,
          items: [],
          errorMessage: msg,
        };
      })
      .addCase(fetchAllPosts.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
          errorMessage: null,
          items: [],
        };
      })
      .addCase(
        fetchAllPosts.fulfilled,
        (_state, action: PayloadAction<Post[]>) => {
          return {
            ...initialState,
            items: action.payload,
            loaded: true,
            hasError: false,
          };
        },
      )
      .addCase(fetchAllPosts.rejected, (_state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to fetch posts';

        return {
          ...initialState,
          loaded: true,
          hasError: true,
          items: [],
          errorMessage: msg,
        };
      });
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;

// Seletores tipados.
// Se você tiver RootState em src/app/store, prefira importar e usar aqui.
export const selectPosts = (state: { posts: PostsState }) => state.posts.items;
export const selectPostsLoaded = (state: { posts: PostsState }) =>
  state.posts.loaded;
export const selectPostsHasError = (state: { posts: PostsState }) =>
  state.posts.hasError;
export const selectPostsErrorMessage = (state: { posts: PostsState }) =>
  state.posts.errorMessage ?? null;

export default postsSlice.reducer;
