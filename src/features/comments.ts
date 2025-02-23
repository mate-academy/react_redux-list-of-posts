import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const result = await getPostComments(postId);

    return result;
  },
);

export const addComment = createAsyncThunk(
  'comments/post',
  async (data: Omit<Comment, 'id'>) => {
    const result = await createComment(data);

    return result;
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      return { ...state, loaded: false };
    });

    builder.addCase(loadComments.fulfilled, (state, actions) => {
      return { ...state, items: actions.payload, loaded: true };
    });

    builder.addCase(loadComments.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });

    builder.addCase(addComment.fulfilled, (state, actions) => {
      return { ...state, items: [...state.items, actions.payload] };
    });

    builder.addCase(addComment.rejected, state => {
      return { ...state, hasError: true };
    });

    builder.addCase(removeComment.fulfilled, (state, actions) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== +actions.payload),
      };
    });

    builder.addCase(removeComment.rejected, state => {
      return { ...state, hasError: true };
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
