/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Comment } from '../../types/Comment';
import { NewComment } from '../../types/NewComment';

export interface InitialState {
  comments: Comment[] | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: InitialState = {
  comments: null,
  loaded: false,
  hasError: false,
};

const URL = 'https://mate.academy/students-api/comments';

export const fetchComments = createAsyncThunk('comments/fetchComments',
  async (postId: number) => {
    const response = await axios.get(`${URL}?postId=${postId}`);

    return response.data;
  });

export const addNewComment = createAsyncThunk('comments/addNewComment',
  async (comment: NewComment) => {
    const response = await axios.post(URL, comment);

    return response.data;
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      if (state.comments && state.comments.length > 0) {
        state.comments = state.comments?.filter(el => el.id !== action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.comments = [];
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.hasError = false;

          state.comments = [...action.payload];
          console.log(state.comments);
        })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
        state.comments = [];
      })
      .addCase(addNewComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.loaded = true;
          state.hasError = false;
          if (state.comments) {
            state.comments = [...state.comments, action.payload];
          } else {
            state.comments = [action.payload];
          }
        })
      .addCase(addNewComment.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
