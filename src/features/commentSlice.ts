/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Comments = {
  comments: Comment[];
  loaded: boolean;
  error: boolean;
  visible: boolean;
};

const initialState: Comments = {
  comments: [],
  loaded: true,
  error: false,
  visible: false,
};

export const initComments = createAsyncThunk(
  'comment/fetch',
  async (userId: number) => {
    const value = await getPostComments(userId);

    return value;
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    removeComments: (state) => {
      state.comments = [];
    },

    removeComment: (state, action: PayloadAction<number>) => {
      const filteredState = state.comments.filter(item => {
        return item.id !== action.payload;
      });

      state.comments = filteredState;
    },

    changeVisible: (state, action) => {
      state.visible = action.payload;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    changeError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.loaded = true;
      state.error = true;
    });
  },
});

export const {
  removeComments,
  changeVisible,
  addComment,
  changeError,
  removeComment,
} = commentSlice.actions;
export default commentSlice.reducer;
