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

export const fetchComments = createAsyncThunk('comments/fetch',
  async (postId: number) => {
    const fetchedComments = await getPostComments(postId);

    return fetchedComments;
  });

export const makeComments = createAsyncThunk('comments/create',
  async (data: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(data);

    return createdComment;
  });

export const removeComment = createAsyncThunk('comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

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
    builder.addCase(fetchComments.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(fetchComments.fulfilled, state => {
      return { ...state, loaded: true, hasError: false };
    });
    builder.addCase(fetchComments.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
    builder.addCase(makeComments.fulfilled, (state, action) => {
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
