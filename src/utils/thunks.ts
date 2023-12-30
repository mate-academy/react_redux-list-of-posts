import { createAsyncThunk } from '@reduxjs/toolkit';
import * as comments from '../api/comments';
import * as posts from '../api/posts';
import * as users from '../api/users';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch', (id: number) => {
    return comments.getPostComments(id);
  },
);

export const postComment = createAsyncThunk(
  'comments/add', (data: Omit<Comment, 'id'>) => {
    return comments.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete', (commentId: number) => {
    return comments.deleteComment(commentId);
  },
);

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch', (userId: number) => {
    return posts.getUserPosts(userId);
  },
);

export const fetchUser = createAsyncThunk(
  'user/fetch', () => {
    return users.getUsers();
  },
);
