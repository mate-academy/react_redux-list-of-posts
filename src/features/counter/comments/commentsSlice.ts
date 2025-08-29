/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../../types/Comment';
import { getPostComments } from '../../../api/comments';

type CommentsState = {
  items: Comment[] | [];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'GetComments/fetch',
  async (userId: number) => {
    return getPostComments(userId);
  },
);

const commentsSlice = createSlice({
  name: 'GetComments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[] | []>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { setComments, setLoaded, setError } = commentsSlice.actions;
