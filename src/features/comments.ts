// commentsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { RootState } from '../app/store';

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsState {
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
  async () => {
    return client.get<Comment[]>('/comments');
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
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const selectAllComments = (state: RootState) => state.comments.items;
