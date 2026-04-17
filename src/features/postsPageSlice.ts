import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { getUserPosts } from '../api/posts';
import * as commentsApi from '../api/comments';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type UsersState = User[];
type AuthorState = User | null;
type SelectedPostState = Post | null;

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const usersInitialState: UsersState = [];
const authorInitialState: AuthorState = null;
const selectedPostInitialState: SelectedPostState = null;

const postsInitialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsInitialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: CommentData & { postId: number }) => {
    return commentsApi.createComment(commentData);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (_, action) => action.payload);
  },
});

const authorSlice = createSlice({
  name: 'author',
  initialState: authorInitialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: selectedPostInitialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    clearPosts: () => ({ ...postsInitialState }),
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, () => ({
        items: [],
        loaded: false,
        hasError: false,
      }))
      .addCase(loadPosts.fulfilled, (_, action) => ({
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(loadPosts.rejected, () => ({
        items: [],
        loaded: true,
        hasError: true,
      }));
  },
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsInitialState,
  reducers: {
    clearComments: () => ({ ...commentsInitialState }),
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, () => ({
        items: [],
        loaded: false,
        hasError: false,
      }))
      .addCase(loadComments.fulfilled, (_, action) => ({
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(loadComments.rejected, () => ({
        items: [],
        loaded: true,
        hasError: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }))
      .addCase(removeComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});

export const { setAuthor } = authorSlice.actions;
export const { setSelectedPost } = selectedPostSlice.actions;
export const { clearPosts } = postsSlice.actions;
export const { clearComments } = commentsSlice.actions;

export const usersReducer = usersSlice.reducer;
export const authorReducer = authorSlice.reducer;
export const postsReducer = postsSlice.reducer;
export const selectedPostReducer = selectedPostSlice.reducer;
export const commentsReducer = commentsSlice.reducer;
