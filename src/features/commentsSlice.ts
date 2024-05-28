/* eslint-disable no-param-reassign */
import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: '',
};

export const initPostComments = createAsyncThunk(
  'comments/getComments',
  (id: number) => getPostComments(id),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initPostComments.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        initPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.status = 'idle';
        },
      )
      .addCase(initPostComments.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { add, remove } = commentsSlice.actions;

export const addComment =
  (data: Omit<Comment, 'id'>) => async (dispatch: Dispatch) => {
    try {
      const res = await createComment(data);

      dispatch(add(res));
    } catch (error) {
      throw error;
    }
  };

export const removeComment =
  (commentId: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(remove(commentId));
      await deleteComment(commentId);
    } catch (error) {
      throw error;
    }
  };

export default commentsSlice.reducer;
