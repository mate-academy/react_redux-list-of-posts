import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  visible: boolean;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  visible: false,
  isLoading: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const deleteAsyncComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    clear: state => {
      state.comments = [];
    },
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadComments.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { setLoading, setVisible, setError, add, remove } =
  commentsSlice.actions;
