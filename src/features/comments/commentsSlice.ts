import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const getCommentsThunk = createAsyncThunk(
  'comments/getComments',
  async (postId: number) => {
    const response = await commentsApi.getPostComments(postId);

    return response;
  },
);

export const addCommentThunk = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData & { postId: number }) => {
    const response = await commentsApi.createComment(data);

    return response;
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCommentsThunk.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(
      getCommentsThunk.fulfilled,
      (state, action: PayloadAction<Comment[]>) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }),
    );
    builder.addCase(getCommentsThunk.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(
      addCommentThunk.fulfilled,
      (state, action: PayloadAction<Comment>) => ({
        ...state,
        items: [...state.items, action.payload],
      }),
    );
    builder.addCase(addCommentThunk.rejected, state => ({
      ...state,
      hasError: true,
    }));

    builder.addCase(
      deleteCommentThunk.fulfilled,
      (state, action: PayloadAction<number>) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }),
    );
  },
});

export default commentsSlice.reducer;
