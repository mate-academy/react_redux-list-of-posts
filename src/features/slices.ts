import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { Post } from '../types/Post';

export const fetchUsers = createAsyncThunk('users/fetch', () =>
  client.get<User[]>('/users'),
);
export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`),
);
export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => client.get<Comment[]>(`/comments?postId=${postId}`),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [] as User[], loaded: false, hasError: false },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });
    builder.addCase(fetchUsers.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as number | null,
  reducers: {
    setAuthor: (state, action: PayloadAction<number | null>) => {
      return action.payload;
    },
  },
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [] as Post[], loaded: false, hasError: false },
  reducers: {
    clearPosts: state => {
      return { ...state, items: [], loaded: false, hasError: false };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });
    builder.addCase(fetchPosts.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: { items: [] as Comment[], loaded: false, hasError: false },
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      return { ...state, items: [...state.items, action.payload] };
    },
    removeComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(c => c.id !== action.payload),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });
    builder.addCase(fetchComments.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export const { setAuthor } = authorSlice.actions;
export const { clearPosts } = postsSlice.actions;
export const { setSelectedPost } = selectedPostSlice.actions;
export const { addComment, removeComment } = commentsSlice.actions;
