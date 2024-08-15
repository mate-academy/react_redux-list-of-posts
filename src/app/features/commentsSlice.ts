import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  // asyncThunkCreator,
  // buildCreateSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

const initialState = {
  items: [] as Comment[],
  loaded: true,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (newComment: Comment) => createComment(newComment),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    resetLoader: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    resetError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
    takeComment: (state, action: PayloadAction<number>) => {
      const newList = state.items.filter(
        comment => comment.id !== action.payload,
      );

      return { ...state, items: newList };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      return { ...state, loaded: false };
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });
    builder.addCase(fetchComments.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
        loaded: true,
      };
    });
    builder.addCase(addComment.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });

    builder.addCase(removeComment.rejected, state => {
      alert('Failed to delete comment, please try again!');

      return { ...state };
    });
  },
});

export const { addNewComment, resetError, resetLoader, takeComment } =
  commentsSlice.actions;
