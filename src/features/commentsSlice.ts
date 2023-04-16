import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: Props = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadApiComments = createAsyncThunk(
  'comments/load', getPostComments,
);

export const addNewComment = createAsyncThunk(
  'comments/add', createComment,
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComments: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadApiComments.pending, (state) => {
      return {
        ...state,
        loaded: true,
      };
    });

    builder.addCase(loadApiComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        return {
          ...state,
          comments: action.payload,
          loaded: true,
        };
      });

    builder.addCase(loadApiComments.rejected, (state) => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });

    builder.addCase(addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        return {
          ...state,
          comments: [...state.comments, action.payload],
        };
      });

    builder.addCase(addNewComment.rejected,
      (state) => {
        return {
          ...state,
          hasError: true,
        };
      });
  },

});

export const { removeComments } = commentsSlice.actions;
export default commentsSlice.reducer;
