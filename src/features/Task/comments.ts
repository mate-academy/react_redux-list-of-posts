/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../utils/axiosClient';
import { Comment, CommentData } from '../../types/Comment';

type CommentsTypeState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsTypeState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadingComments = createAsyncThunk<Comment[], number>(
  'comments/axios',
  async (postId: number) => {
    const data = await client.get<Comment[]>(`/comments?postId=${postId}`);

    return data;
  },
);

export const createComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/create', async commentData => {
  const data = await client.post<Comment>('/comments', commentData);

  return data;
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/delete',
  async (commentId: number) => {
    await client.delete(`/comments/${commentId}`);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadingComments.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadingComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(loadingComments.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
        },
      );
  },
});

export default commentsSlice.reducer;
