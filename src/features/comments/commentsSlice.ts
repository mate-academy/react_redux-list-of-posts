/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[]
  loaded: boolean
  hasError: boolean
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (id: number) => {
    const value = await getPostComments(id);

    return value;
  },
);

export const postCommentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {
    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteComment: (state: CommentsState, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setError: (state: CommentsState, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { addComment, deleteComment, setError }
  = postCommentsSlice.actions;

export default postCommentsSlice.reducer;
