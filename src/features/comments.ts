import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type InitialState = {
  items: Comment[] | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addNewComment = createAsyncThunk(
  'comments/create',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: state.items ? [...state.items, action.payload] : [action.payload],
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: action.payload,
    }));
    builder.addCase(init.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(addNewComment.pending, state => ({
      ...state,
      hasError: false,
    }));
    builder.addCase(addNewComment.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: state.items ? [...state.items, action.payload] : [action.payload],
    }));
    builder.addCase(addNewComment.rejected, state => ({
      ...state,
      hasError: true,
    }));

    builder.addCase(removeComment.pending, state => ({
      ...state,
      hasError: false,
    }));
    builder.addCase(removeComment.fulfilled, (state, action) => ({
      ...state,
      items: state.items
        ? state.items.filter(comment => comment.id !== action.payload)
        : [],
    }));
    builder.addCase(removeComment.rejected, state => ({
      ...state,
      hasError: true,
    }));
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
