import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types';
import { getPostComments, createComment, deleteComment } from '../api/comments';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
};

const initialState: InitialState = {
  loaded: true,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('comments/fetchComments', (id: number) => {
  return getPostComments(id);
});

export const createNewComment = createAsyncThunk(
  'comments/createNewComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (id: number) => {
    return deleteComment(id);
  },
);

export const commentsSlice = createSlice({
  name: 'commets',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        commets: state.items.filter(comment => comment.id
          !== action.payload),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(init.fulfilled, state => {
      return { ...state, loaded: true, hasError: false };
    });
    builder.addCase(init.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
    builder.addCase(createNewComment.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        commets: [...state.items, action.payload],
      };
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      return {
        ...state,
        commets: state.items.filter(item => item.id !== action.payload),
      };
    });
  },
});

export const { remove } = commentsSlice.actions;
