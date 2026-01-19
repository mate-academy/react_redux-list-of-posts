import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { set as setSelectedPost } from './selectedPost';
import { Comment } from '../types/Comment';

/* eslint-disable no-param-reassign */

export interface InitialStateType {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: InitialStateType = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadByPostId = createAsyncThunk(
  'comments/fetch',
  (postId: Post['id']) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    setError(state, action: PayloadAction<boolean>) {
      state.hasError = action.payload;
    },
    add(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },

    remove(state, action: PayloadAction<Comment['id']>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(setSelectedPost.type, state => {
      return {
        ...state,
        items: [],
        hasError: false,
        loaded: false,
      };
    });

    builder.addCase(loadByPostId.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      loadByPostId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadByPostId.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { add, remove, setError } = commentsSlice.actions;

export function addComment(comment: Omit<Comment, 'id'>) {
  return async (dispatch: Dispatch) => {
    try {
      const addedComment = await createComment(comment);
      dispatch(add(addedComment));
    } catch (e) {
      dispatch(setError(true));
    }
  };
}

export function removeComment(commentId: Comment['id']) {
  return async (dispatch: Dispatch) => {
    try {
      await deleteComment(commentId);
      dispatch(remove(commentId));
    } catch (e) {
      dispatch(setError(true));
    }
  };
}

export default commentsSlice.reducer;
