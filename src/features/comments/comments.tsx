import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsInfo = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsInfo = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state: CommentsInfo, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter((comment) => comment.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending || addComment.pending, (state) => {
      return { ...state, loaded: false };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });
    builder.addCase(init.rejected || addComment.rejected, (state) => {
      return { ...state, hasError: true, loaded: true };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const { remove } = commentsSlice.actions;

export const removeComment = (commentId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(remove(commentId));

    await deleteComment(commentId);
  };
};

export default commentsSlice.reducer;
