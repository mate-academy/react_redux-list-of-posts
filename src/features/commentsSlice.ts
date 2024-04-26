/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

// export interface CommentsState {
//   posts: Comment[];
//   status: 'idle' | 'loading' | 'failed';
// }

// const initialState: CommentsState = {
//   posts: [],
//   status: 'idle',
// };

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetchPostComments',
  async (userId: number) => {
    const posts = getPostComments(userId);

    return posts;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(commentsAsync.pending, state => {
  //       state.status = 'loading';
  //     })
  //     .addCase(commentsAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.posts = action.payload;
  //     })
  //     .addCase(commentsAsync.rejected, state => {
  //       state.status = 'failed';
  //     });
  // },
});

export const { set, setLoading, setError, add, remove } = commentsSlice.actions;

export default commentsSlice.reducer;
