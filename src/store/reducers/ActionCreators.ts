import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://mate.academy/students-api';

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const url = `${BASE_URL}/users`;
      const response = await fetch(url);

      return (await response.json()) as User[];
    } catch (error) {
      return thunkAPI.rejectWithValue(`Some problem with fetching users with ${error}`);
    }
  },
);

export const fetchPosts = createAsyncThunk(
  'post/fetch',
  async (userId: number | undefined, thunkAPI) => {
    try {
      let url = `${BASE_URL}/posts`;

      if (userId) {
        url += `?userId=${userId}`;
      }

      const response = await axios.get<Post[]>(url);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removePost = createAsyncThunk(
  'post/remove',
  async (postId: number, thunkAPI) => {
    try {
      const url = `${BASE_URL}/posts/${postId}`;

      const response = await axios.delete(url);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Some problem with fetching posts with ${error}`);
    }
  },
);

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetch',
  async (postId: number, thunkAPI) => {
    try {
      const url = `${BASE_URL}/comments?postId=${postId}`;

      const response = await axios.get<Comment>(url);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Some problem with fetching comments with ${error}`);
    }
  },
);

export const removeCommentById = createAsyncThunk(
  'comment/remove',
  async (commentId: number, thunkAPI) => {
    try {
      const url = `${BASE_URL}/comments/${commentId}`;

      const response = await axios.delete(url);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Some problem with removing comment with ${error}`);
    }
  },
);

export const addComment = createAsyncThunk(
  'comment/add',
  async (newComment: NewComment, thunkAPI) => {
    try {
      const url = `${BASE_URL}/comments`;
      const headers = {
        'Content-type': 'application/json; charset=utf-8',
      };

      const response = await axios.post(url, newComment, { headers });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Some problem with adding new comment with ${error}`);
    }
  },
);
