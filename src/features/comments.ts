import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(newComment);

    return createdComment;
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(fetchComments.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );

    builder.addCase(
      deletePostComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      },
    );
  },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
