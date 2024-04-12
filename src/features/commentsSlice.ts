import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type Comments = {
  data: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: Comments = {
  data: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/getComments',
  async (id: number) => {
    return getPostComments(id);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommentLocally: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },

    deleteComment: (state, action) => {
      return {
        ...state,
        data: state.data.filter(comment => comment.id !== action.payload),
      };
    },

    setError: (state, action) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },

    setLoaded: (state, action) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },

    setVisible: (state, action) => {
      return {
        ...state,
        visible: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getCommentsAsync.pending, state => {
      return { ...state, loaded: false };
    });
    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      return { ...state, data: action.payload, loaded: true };
    });
    builder.addCase(getCommentsAsync.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export const {
  addCommentLocally,
  deleteComment,
  setError,
  setLoaded,
  setVisible,
} = commentsSlice.actions;
export default commentsSlice.reducer;
