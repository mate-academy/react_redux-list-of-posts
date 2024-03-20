import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SliceType } from '../types/SliceType';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

enum ActionType {
  SetPostComments = 'comments/fetch',
}

type State = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: State = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const setComments = createAsyncThunk(
  ActionType.SetPostComments,
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: SliceType.Comments,
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => ({
      ...state,
      comments: [...state.comments, action.payload],
    }),
    remove: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },
  extraReducers: builder => {
    builder.addCase(setComments.pending, state => ({
      ...state,
      loaded: false,
    }));

    builder.addCase(setComments.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loaded: true,
    }));

    builder.addCase(setComments.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
