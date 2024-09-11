/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type StateProps = {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: StateProps = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchPostComments = createAsyncThunk<Comment[], number>(
  'comment/getPostComments',
  async (id: number) => {
    try {
      const response = await getPostComments(id);

      return response;
    } catch (error) {
      throw error;
    }
  },
);
/* eslint-disable @typescript-eslint/indent */
export const fetchCreatePostComment = createAsyncThunk<
  Comment,
  Omit<Comment, 'id'>
>('comment/fetchCreatePostComment', async data => {
  try {
    const createdComment = await createComment(data);

    return createdComment;
  } catch (error) {
    throw error;
  }
});

export const fetchDeletePostComment = createAsyncThunk(
  'comment/fetchDeletePostComment',
  async (id: number) => {
    try {
      await deleteComment(id);

      return id;
    } catch (error) {
      throw error;
    }
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
      })
      .addCase(
        fetchPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchCreatePostComment.pending, state => {
        state.loaded = false;
      })
      .addCase(
        fetchCreatePostComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.loaded = false;
          state.items = [...state.items, action.payload];
        },
      )
      .addCase(fetchCreatePostComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchDeletePostComment.pending, state => {
        state.loaded = false;
      })
      .addCase(
        fetchDeletePostComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loaded = true;
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      )
      .addCase(fetchDeletePostComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default commentSlice.reducer;
