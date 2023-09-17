/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type InitialStateValues = {
  items: Comment[],
  hasError: boolean,
  loaded: boolean,
};

const initialState: InitialStateValues = {
  items: [],
  hasError: false,
  loaded: false,
};

export const initComments = createAsyncThunk('comments/fetch', (
  postId: number,
) => getPostComments(postId));

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    deleteComments: (state, action: PayloadAction<Comment>) => {
      state.items = state.items
        .filter(comment => comment.id !== action.payload.id);
    },

    changeError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (
      state,
      action: PayloadAction<Comment[]>,
    ) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const {
  addComments,
  deleteComments,
  changeError,
} = commentsSlice.actions;
export default commentsSlice.reducer;
