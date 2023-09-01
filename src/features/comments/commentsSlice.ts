import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from './commentsApi';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[]
  loaded: boolean,
  hasError: boolean
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('commets/fetch', (id: number) => {
  return getPostComments(id);
});

export const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setNewComment: (state, action) => {
      state.comments.push(action.payload);
    },

    setDeleteComment: (state, action) => ({
      ...state,
      comments: state.comments.filter(
        comment => comment.id !== action.payload,
      ),
    }),

    setLoaded: (state, action) => ({
      ...state,
      loaded: action.payload,
    }),

    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loaded: true,
    }));

    builder.addCase(init.rejected, (state) => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export default commentsSlice.reducer;
export const {
  setNewComment,
  setDeleteComment,
  setLoaded,
  setError,
} = commentsSlice.actions;
