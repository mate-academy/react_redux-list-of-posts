/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentErrors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

type State = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  errors: CommentErrors;
  isAddingComment: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
  errors: {
    name: false,
    email: false,
    body: false,
  },
  isAddingComment: false,
};

export const fetchCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  (postId: Post['id']) => {
    return new Promise<Comment[]>((resolve, reject) => {
      getPostComments(postId)
        .then((allComments: Comment[]) => {
          resolve(
            allComments.filter((comment: Comment) => comment.postId === postId),
          );
        })
        .catch(reject);
    });
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComments',
  (comment: Comment) => {
    return new Promise<Comment>((resolve, reject) => {
      commentsApi.createComment(comment).then(resolve).catch(reject);
    });
  },
);

export const commentsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },

    add: (state, action: PayloadAction<Comment>) => {
      commentsApi.createComment(action.payload);

      state.items.push(action.payload);
    },

    remove: (state, action: PayloadAction<Comment['id']>) => {
      deleteComment(action.payload);

      return {
        ...state,
        items: state.items.filter(
          (comment: Comment) => comment.id !== action.payload,
        ),
      };
    },

    clear: state => {
      state.items = [];
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    setErrors: (state, action: PayloadAction<CommentErrors>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetching comments
    builder.addCase(fetchCommentsAsync.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(
      fetchCommentsAsync.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      },
    );

    builder.addCase(fetchCommentsAsync.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    // Adding comment
    builder.addCase(addCommentAsync.pending, state => {
      state.isAddingComment = true;
    });
    builder.addCase(addCommentAsync.fulfilled, state => {
      state.isAddingComment = false;
    });
    builder.addCase(addCommentAsync.rejected, state => {
      state.isAddingComment = false;
    });
  },
});

export const actions = commentsSlice.actions;

export default commentsSlice.reducer;
