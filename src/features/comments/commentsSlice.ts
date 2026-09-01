import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => client.get<Comment[]>(`/comments?postId=${postId}`),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (newCommentData: Omit<Comment, 'id'>) =>
    client.post<Comment>('/comments', newCommentData),
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await client.delete(`/comments/${commentId}`);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(deleteComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }));
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
