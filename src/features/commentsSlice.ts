import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadCommentsByPost = createAsyncThunk<Comment[], number>(
  'comments/fetchByPost',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async data => createComment(data),
);

export const removeComment = createAsyncThunk<number, number>(
  'comments/remove',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => ({
      ...state,
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers(builder) {
    builder.addCase(loadCommentsByPost.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(loadCommentsByPost.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(loadCommentsByPost.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(addComment.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: [...state.items, action.payload],
    }));

    builder.addCase(removeComment.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      items: state.items.filter(comment => comment.id !== action.payload),
    }));
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
