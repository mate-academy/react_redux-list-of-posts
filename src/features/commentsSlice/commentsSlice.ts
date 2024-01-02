import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import {
  getPostComments,
  deleteComment as deleteCommentApi,
  createComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  submitLoaded: boolean;
  hasError: boolean | null;
}

export const fetchComments = createAsyncThunk('comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response as Comment[];
  });

export const addComments = createAsyncThunk(
  'comments/addComments',
  async (comment: Omit<Comment, 'id'>) => {
    const response = await createComment(comment);

    return response as Comment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const response = await deleteCommentApi(commentId);

    return response as number;
  },
);

const initialState: CommentsState = {
  loaded: true,
  hasError: null,
  submitLoaded: false,
  items: [],
};

const commentsSlice: Slice<CommentsState, any, 'comments'> = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state: CommentsState, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    isLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    isHasError: (state, action: PayloadAction<boolean | null>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        return {
          ...state,
          loaded: false,
          hasError: false,
          items: [],
        } as CommentsState;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          loaded: true,
          hasError: false,
          items: action.payload,
        } as CommentsState;
      })
      .addCase(fetchComments.rejected, (state) => {
        return {
          ...state,
          loaded: true,
          hasError: true,
          items: [],
        } as CommentsState;
      });

    builder
      .addCase(addComments.pending, (state) => {
        return {
          ...state,
          submitLoaded: true,
        } as CommentsState;
      })
      .addCase(addComments.rejected, (state) => {
        return {
          ...state,
          submitLoaded: false,
          hasError: true,
        } as CommentsState;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        return {
          ...state,
          submitLoaded: false,
          hasError: false,
          items: [...state.items, action.payload],
        } as CommentsState;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        return {
          ...state,
          loaded: true,
          hasError: null,
        } as CommentsState;
      })
      .addCase(deleteComment.rejected, (state) => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        } as CommentsState;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const updatedItems = state.items.filter(
          (comment) => +comment.id !== +action.meta.arg,
        );

        return {
          ...state,
          loaded: true,
          hasError: null,
          items: updatedItems,
        } as CommentsState;
      });
  },
});

export const { setComments, isHasError } = commentsSlice.actions;

export default commentsSlice.reducer;
