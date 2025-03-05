import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

const initialState = {
  loaded: false,
  comments: [] as Comment[],
  hasError: false,
  visible: false,
};

export const commentsInit = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        visible: payload,
      };
    },

    setError(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        hasError: payload,
      };
    },

    setComment(state, { payload }: PayloadAction<Comment>) {
      return {
        ...state,
        comments: [...state.comments, payload],
      };
    },

    removeComment(state, { payload }: PayloadAction<number>) {
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== payload),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(commentsInit.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(commentsInit.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loaded: true,
      };
    });

    builder.addCase(commentsInit.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { setVisible, setError, setComment, removeComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
