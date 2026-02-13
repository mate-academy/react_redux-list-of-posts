/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { RootState } from '../store';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

// Селектори
export const selectCommentsState = (state: RootState) => state.comments;

export const selectComments = createSelector(
  selectCommentsState,
  comments => comments.items,
);

export const selectCommentsLoaded = createSelector(
  selectCommentsState,
  comments => comments.loaded,
);

export const selectCommentsError = createSelector(
  selectCommentsState,
  comments => comments.hasError,
);

export const { clearComments, addComment, removeComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
