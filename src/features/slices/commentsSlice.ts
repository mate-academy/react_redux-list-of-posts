import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export const fetchComments = createAsyncThunk('comments/fetch',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  });

export const createNewComment = createAsyncThunk('comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  });

export const removeComment = createAsyncThunk('comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  isLoading: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  isLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state: CommentsState, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, (state: CommentsState) => {
      state.loaded = false;
      state.hasError = false;
    })
      .addCase(fetchComments.fulfilled, (
        state: CommentsState,
        action: PayloadAction<Comment[]>,
      ) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(createNewComment.pending, (state: CommentsState) => {
        state.isLoading = true;
      })
      .addCase(createNewComment.fulfilled, (
        state: CommentsState,
        action: PayloadAction<Comment>,
      ) => {
        state.comments.push(action.payload);
        state.isLoading = false;
      })
      .addCase(removeComment.fulfilled, (
        state: CommentsState,
        action: PayloadAction<number>,
      ) => {
        return {
          ...state,
          comments: state.comments
            .filter(comment => comment.id !== action.payload),
        };
      });
  },
});

export const { actions } = commentsSlice;
