import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

// Thunks
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number | undefined) => {
    if (postId === undefined) {
      return;
    }

    const response = await getPostComments(postId);

    return response;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
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
    clear: state => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchComments.rejected, state => {
        return {
          ...state,
          loaded: false,
          hasError: true,
        };
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          return {
            ...state,
            items: state.items.filter(comment => comment.id !== action.payload),
          };
        },
      );
  },
});

export const commentsReducer = commentsSlice.reducer;
export type { CommentsState };
