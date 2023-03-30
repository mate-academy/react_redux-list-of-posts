/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface IPostState {
  comments: Comment[],
  loader: boolean,
  error: boolean
}

const initialState: IPostState = {
  comments: [],
  loader: false,
  error: false,
};

export const getCommentsAction = createAsyncThunk(
  'comments/GET',
  async (id:number) => {
    const result = await commentsApi.getPostComments(id);

    return result;
  },
);

export const setCommentAction = createAsyncThunk(
  'comment/POST',
  async (comment: Comment) => {
    const result = commentsApi.createComment(comment);

    return result;
  },
);

export const deleteCommentAction = createAsyncThunk(
  'comment/DELETE',
  async (id: number) => {
    commentsApi.deleteComment(id);

    return id;
  },
);

const commentsSlider = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCommentsAction.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loader = false;
    });
    builder.addCase(getCommentsAction.rejected, (state) => {
      state.error = true;
      state.loader = false;
    });
    builder.addCase(setCommentAction.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(
      deleteCommentAction.fulfilled,
      (state, action:PayloadAction<number>) => {
        state.comments?.filter((el:Comment) => el.id !== action.payload);
      },
    );
    builder.addCase(deleteCommentAction.rejected, (state) => {
      state.error = true;
    });
  },
  reducers: {
    stopLoader: (state) => {
      state.loader = false;
    },
    hiddeError: (state) => {
      state.error = false;
    },
    addCommentAction: (state, action:PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },
});

export const {
  stopLoader,
  hiddeError,
  addCommentAction,
} = commentsSlider.actions;

export const commentsReducer = commentsSlider.reducer;
