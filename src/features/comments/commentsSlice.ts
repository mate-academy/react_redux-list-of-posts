/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { loadingStatus, Status } from '../posts/postsSlice';
import { client } from '../../utils/fetchClient';

export const fetchComments = createAsyncThunk('comments/fetchComments',
  async (postId: number) => {
    const response = await client.get<Comment[]>(`/comments?postId=${postId}`);

    return response;
  });

export const createComment = createAsyncThunk('comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await client.post<Comment>('/comments', data);

    return response;
  });

export const deleteComment = createAsyncThunk('comments/deleteComment',
  async (commentId: number) => {
    const response = await client.delete(`/comments/${commentId}`);

    return response;
  });

type CommentsState = {
  comments: Comment[],
  loaded: Status,
  hasError: string | null,
};

const initialState: CommentsState = {
  comments: [],
  loaded: loadingStatus.idle,
  hasError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    add: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    delete: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comm => comm.id !== action.payload,
        ),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = loadingStatus.loading;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = loadingStatus.succeeded;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loaded = loadingStatus.failed;
        state.hasError = action.error.message || null;
      });
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
