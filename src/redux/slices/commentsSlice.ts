/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  created: boolean;
  hasError: boolean;
};

type NewComment = {
  postId: number;
  data: CommentData;
};

type CommentThunk = 'fetchComments' | 'addComment' | 'removeComment';

const initialState: CommentsState = {
  items: [],
  loaded: false,
  created: false,
  hasError: false,
};

export const thunks = {
  fetchComments: createAsyncThunk(
    'comments/fetch',
    (postId: number) => getPostComments(postId),
  ),

  addComment: createAsyncThunk(
    'comments/add',
    ({ postId, data }: NewComment) => createComment(postId, data),
  ),

  removeComment: createAsyncThunk(
    'comments/delete',
    (commentId: number, { dispatch }) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(removeCommentById(commentId));

      return deleteComment(commentId);
    },
  ),
};

const commentsExtraReducer = (
  builder: ActionReducerMapBuilder<CommentsState>,
  thunkType: CommentThunk,
) => {
  const commentThunk = thunks[thunkType];

  if (!commentThunk) {
    throw new Error('Something went wrong');
  }

  builder
    .addCase(commentThunk.pending, (state) => {
      state.hasError = false;
      state.created = false;
    })
    .addCase(commentThunk.fulfilled, (state, action) => {
      switch (thunkType) {
        case 'fetchComments':
          state.items = [...action.payload as Comment[]];
          state.loaded = true;
          break;

        case 'addComment':
          state.items.push(action.payload as Comment);
          state.created = true;
          break;

        case 'removeComment':
          break;

        default:
          throw new Error('Something went wrong');
      }
    })
    .addCase(commentThunk.rejected, (state) => {
      state.loaded = true;
      state.created = true;
      state.hasError = true;
    });
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
    removeCommentById: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    commentsExtraReducer(builder, 'fetchComments');
    commentsExtraReducer(builder, 'addComment');
    commentsExtraReducer(builder, 'removeComment');
  },
});

export const { clearComments, removeCommentById } = commentsSlice.actions;

export default commentsSlice.reducer;
