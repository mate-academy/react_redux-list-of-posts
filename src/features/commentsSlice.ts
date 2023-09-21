import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Comment, NewComment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface PostsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  (object: NewComment) => {
    return commentsApi.createComment({
      name: object.name,
      email: object.email,
      body: object.body,
      postId: object.id,
    });
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (comment: Comment) => {
    return commentsApi.deleteComment(comment.id);
  },
);

const initialState: PostsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload,
      };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload,
        ],
      };
    },
    removeComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload.id,
        ),
      };
    },
    clearComments: (state) => {
      return {
        ...state,
        selectedPost: null,
      };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        comments: action.payload,
      };
    });

    builder.addCase(loadComments.rejected, (state) => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });

    builder.addCase(addNewComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload,
        ],
      };
    });

    builder.addCase(addNewComment.rejected, (state) => {
      return {
        ...state,
        hasError: true,
      };
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  addComment,
  removeComment,
  clearComments,
  setError,
  setLoaded,
} = commentsSlice.actions;
