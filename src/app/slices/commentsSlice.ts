import { createAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
// eslint-disable-next-line max-len
import { addComments, deleteComments, fetchComments } from '../thunks/commentThunk';

export type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isSubmitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: true,
  hasError: false,
  isSubmitting: false,
};

export const resetComments = createAction('comments/reset');

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };
    },
    clearComment: state => {
      return {
        ...state,
        comments: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetComments, () => {
      return initialState;
    }).addCase(fetchComments.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }).addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    }).addCase(fetchComments.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    })
      .addCase(addComments.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(addComments.fulfilled, (state, action) => {
        return {
          ...state,
          isSubmitting: false,
          comments: [...state.comments, action.payload],
        };
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments
            .filter((comment) => comment.id !== action.payload),
        };
      });
  },
});

export default commentSlice.reducer;
export const { removeComment, clearComment } = commentSlice.actions;
