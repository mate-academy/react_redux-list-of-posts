/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { getUserPosts } from '../../api/posts';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment, CommentData } from '../../types/Comment';

type LoadableItems<T> = {
  loaded: boolean;
  hasError: boolean;
  items: T[];
};

type CommentsState = LoadableItems<Comment> & {
  visible: boolean;
};

export interface PostsState {
  users: User[];
  author: User | null;
  posts: LoadableItems<Post>;
  selectedPost: Post | null;
  comments: CommentsState;
}

const initialState: PostsState = {
  users: [],
  author: null,
  posts: {
    loaded: false,
    hasError: false,
    items: [],
  },
  selectedPost: null,
  comments: {
    loaded: false,
    hasError: false,
    items: [],
    visible: false,
  },
};

export const fetchUsers = createAsyncThunk('posts/fetchUsers', getUsers);

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId: number) => getUserPosts(userId),
);

export const fetchCommentsByPost = createAsyncThunk(
  'posts/fetchCommentsByPost',
  async (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({
    postId,
    commentData,
  }: {
    postId: number;
    commentData: CommentData;
  }) =>
    createComment({
      ...commentData,
      postId,
    }),
);

export const removeComment = createAsyncThunk(
  'posts/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const resetCommentsState = (state: PostsState) => {
  state.comments.loaded = false;
  state.comments.hasError = false;
  state.comments.items = [];
  state.comments.visible = false;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.author = action.payload;
      state.selectedPost = null;
      state.posts.loaded = false;
      state.posts.hasError = false;
      state.posts.items = [];
      resetCommentsState(state);
    },
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
      resetCommentsState(state);
    },
    showCommentForm(state) {
      state.comments.visible = true;
    },
    hideCommentForm(state) {
      state.comments.visible = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchPostsByUser.pending, state => {
        state.posts.loaded = false;
        state.posts.hasError = false;
        state.posts.items = [];
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.posts.loaded = true;
        state.posts.items = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.posts.loaded = true;
        state.posts.hasError = true;
      })
      .addCase(fetchCommentsByPost.pending, state => {
        state.comments.loaded = false;
        state.comments.hasError = false;
        state.comments.items = [];
        state.comments.visible = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.comments.loaded = true;
        state.comments.items = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.comments.loaded = true;
        state.comments.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.comments.hasError = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments.items = state.comments.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(removeComment.rejected, state => {
        state.comments.hasError = true;
      });
  },
});

export const { setAuthor, setSelectedPost, showCommentForm, hideCommentForm } =
  postsSlice.actions;

export const selectUsers = (state: RootState) => state.posts.users;
export const selectAuthor = (state: RootState) => state.posts.author;
export const selectPostsState = (state: RootState) => state.posts.posts;
export const selectSelectedPost = (state: RootState) =>
  state.posts.selectedPost;
export const selectCommentsState = (state: RootState) => state.posts.comments;

export default postsSlice.reducer;
