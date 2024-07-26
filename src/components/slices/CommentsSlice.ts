import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

type NewComment = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type CommentPost = {
  comments: Comment[];
  newComment: NewComment;
  send: boolean;
  formVisibility: boolean;
  loading: boolean;
  loadingNewComment: boolean;
  error: string | null;
};

const initialState: CommentPost = {
  comments: [],
  newComment: {
    postId: 0,
    name: '',
    email: '',
    body: '',
  },
  send: true,
  formVisibility: false,
  loading: false,
  loadingNewComment: false,
  error: null,
};

export const getComments = createAsyncThunk(
  '/getComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  '/addComment',
  (comment: NewComment) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  '/removeComment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      const currentState = state;

      currentState.comments = action.payload;
    },
    setFormVisibility: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.formVisibility = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      const currentState = state;

      currentState.newComment.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      const currentState = state;

      currentState.newComment.email = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      const currentState = state;

      currentState.newComment.body = action.payload;
    },
    setPostId: (state, action: PayloadAction<number>) => {
      const currentState = state;

      currentState.newComment.postId = action.payload;
    },
    setSend: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.send = action.payload;
    },
    setClear: state => {
      const currentState = state;

      currentState.newComment.body = '';
      currentState.newComment.name = '';
      currentState.newComment.email = '';
      currentState.send = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      const currentState = state;

      currentState.loading = true;
      currentState.formVisibility = false;
      currentState.error = null;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      const currentState = state;

      currentState.comments = action.payload;
      currentState.loading = false;
    });
    builder.addCase(getComments.rejected, state => {
      const currentState = state;

      currentState.loading = false;
      currentState.error = 'An error occurred while fetching comments.';
    });
    builder.addCase(removeComment.pending, state => {
      const currentState = state;

      currentState.error = null;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      const currentState = state;

      currentState.comments = currentState.comments.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
    builder.addCase(removeComment.rejected, state => {
      const currentState = state;

      currentState.error = 'An error occurred while deleting the comment.';
    });
    builder.addCase(addComment.pending, state => {
      const currentState = state;

      currentState.error = null;
      currentState.loadingNewComment = true;
      currentState.send = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const currentState = state;

      currentState.comments = [...state.comments, action.payload];
      currentState.send = true;
      currentState.loadingNewComment = false;
    });
    builder.addCase(addComment.rejected, state => {
      const currentState = state;

      currentState.loadingNewComment = false;
      currentState.send = true;
      currentState.error = 'An error occurred while adding the comment.';
    });
  },
});

export const {
  setComments,
  setFormVisibility,
  setName,
  setEmail,
  setBody,
  setPostId,
  setSend,
  setClear,
} = CommentsSlice.actions;

export default CommentsSlice.reducer;
