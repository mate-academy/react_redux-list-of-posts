import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
/*eslint-disable*/
interface NewCommentData {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  adding: boolean;
  isFormOpen: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  adding: false,
  isFormOpen: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchByPost',
  (postId: number) => {
    return client.get<Comment[]>(`/comments?postId=${postId}`);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: NewCommentData) => {
    return client.post<Comment>('/comments', data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/remove',
  async (id: number) => {
    await client.delete(`/comments/${id}`);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.isFormOpen = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, state => {
        state.adding = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.adding = false;
      })
      .addCase(addComment.rejected, state => {
        state.adding = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
