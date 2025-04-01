/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUsers } from '../api/users';
import { getUserPosts } from '../api/posts';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { RootState } from '../app/store';

export interface PostsState {
  users: User[];
  author: User | null;
  posts: {
    loaded: boolean;
    hasError: boolean;
    items: Post[];
  };
  selectedPost: Post | null;
  comments: {
    loaded: boolean;
    hasError: boolean;
    items: Comment[];
  };
}

export const fetchUsers = createAsyncThunk('posts/getUsers', async () => {
  const users = await getUsers();

  return users;
});

export const fetchPosts = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const fetchComments = createAsyncThunk(
  'posts/getComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ name, email, body }: CommentData, { getState }) => {
    const state = getState() as RootState;
    const postId = state.posts.selectedPost?.id;

    if (!postId) {
      throw new Error('No post selected');
    }

    const newComment = await createComment({ name, email, body, postId });

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'posts/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

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
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(fetchPosts.pending, state => {
        state.posts.loaded = false;
      })

      .addCase(fetchPosts.rejected, state => {
        state.posts.hasError = true;
        state.posts.loaded = true;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.loaded = true;
        state.posts.items = action.payload;
      })

      .addCase(fetchComments.pending, state => {
        state.comments.loaded = false;
      })

      .addCase(fetchComments.rejected, state => {
        state.comments.loaded = true;
        state.comments.hasError = true;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments.loaded = true;
        state.comments.items = [...action.payload];
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.items.push(action.payload);
      })

      .addCase(addComment.rejected, state => {
        state.comments.hasError = true;
      })

      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments.items = state.comments.items.filter(
          item => item.id !== action.payload,
        );
      });
  },
});

export default postsSlice.reducer;
