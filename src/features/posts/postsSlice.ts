/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { getUsers } from '../../api/users';
import { getUserPosts } from '../../api/posts';
import {
  createComment as createCommentRequest,
  deleteComment as deleteCommentRequest,
  getPostComments,
} from '../../api/comments';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment, CommentData } from '../../types/Comment';

type LoadableItems<T> = {
  loaded: boolean;
  hasError: boolean;
  items: T[];
};

export interface PostsState {
  users: User[];
  author: User | null;
  posts: LoadableItems<Post>;
  selectedPost: Post | null;
  comments: LoadableItems<Comment>;
}

const createLoadableState = <T>() => ({
  loaded: false,
  hasError: false,
  items: [] as T[],
});

const initialState: PostsState = {
  users: [],
  author: null,
  posts: createLoadableState<Post>(),
  selectedPost: null,
  comments: createLoadableState<Comment>(),
};

export const loadUsers = createAsyncThunk('postsPage/loadUsers', getUsers);

export const loadPosts = createAsyncThunk(
  'postsPage/loadPosts',
  async (userId: number) => getUserPosts(userId),
);

export const loadComments = createAsyncThunk(
  'postsPage/loadComments',
  async (postId: number) => getPostComments(postId),
);

/* eslint-disable @typescript-eslint/indent */
export const addComment = createAsyncThunk<
  Comment,
  CommentData,
  {
    state: RootState;
  }
>('postsPage/addComment', async (commentData, { getState }) => {
  const { selectedPost } = getState().postsPage;

  if (!selectedPost) {
    throw new Error('No post selected');
  }

  return createCommentRequest({
    ...commentData,
    postId: selectedPost.id,
  });
});
/* eslint-enable @typescript-eslint/indent */

export const deleteComment = createAsyncThunk(
  'postsPage/deleteComment',
  async (commentId: number) => {
    await deleteCommentRequest(commentId);

    return commentId;
  },
);

const postsSlice = createSlice({
  name: 'postsPage',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
      state.selectedPost = null;
      state.posts = createLoadableState<Post>();
      state.comments = createLoadableState<Comment>();
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
      state.comments = createLoadableState<Comment>();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadPosts.pending, state => {
        state.posts = createLoadableState<Post>();
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        if (state.author?.id !== action.meta.arg) {
          return;
        }

        state.posts.loaded = true;
        state.posts.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        if (state.author?.id !== action.meta.arg) {
          return;
        }

        state.posts.loaded = true;
        state.posts.hasError = true;
      })
      .addCase(loadComments.pending, state => {
        state.comments = createLoadableState<Comment>();
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        if (state.selectedPost?.id !== action.meta.arg) {
          return;
        }

        state.comments.loaded = true;
        state.comments.items = action.payload;
      })
      .addCase(loadComments.rejected, (state, action) => {
        if (state.selectedPost?.id !== action.meta.arg) {
          return;
        }

        state.comments.loaded = true;
        state.comments.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.selectedPost?.id === action.payload.postId) {
          state.comments.items.push(action.payload);
        }
      })
      .addCase(addComment.rejected, state => {
        state.comments.hasError = true;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.comments.items = state.comments.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      })
      .addCase(deleteComment.rejected, state => {
        state.comments.hasError = true;
      });
  },
});

export const { setAuthor, setSelectedPost } = postsSlice.actions;

export const selectUsers = (state: RootState) => state.postsPage.users;
export const selectAuthor = (state: RootState) => state.postsPage.author;
export const selectPosts = (state: RootState) => state.postsPage.posts;
export const selectSelectedPost = (state: RootState) =>
  state.postsPage.selectedPost;
export const selectComments = (state: RootState) => state.postsPage.comments;

export default postsSlice.reducer;