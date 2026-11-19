import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

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

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (commentData: Omit<Comment, 'id'>) => createComment(commentData),
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => ({
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchPostComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchPostComments.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }));
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
