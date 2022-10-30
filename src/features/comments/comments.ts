/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

// eslint-disable-next-line max-len
export const fetchComments = createAsyncThunk('users/fetchComments', async (id: number, thunkAPI) => {
  try {
    return await getPostComments(id);
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const addComment = createAsyncThunk(
  'users/addComment', async (data: CommentData, thunkAPI) => {
    try {
      return await createComment(data);
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }

      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

export const removeComment = createAsyncThunk(
  'users/removeComment', async (id: number, thunkAPI) => {
    try {
      await deleteComment(id);

      return id;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }

      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

type InitialState = {
  comments: Comment[] | null;
  status:'idle' | 'failed' | 'pending' | 'fullfilled';
  error: string | null;
};

const initialState: InitialState = {
  comments: null,
  status: 'idle',
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.error = null;
        state.comments = [...action.payload];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'error';
        }

        state.status = 'failed';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.error = null;
        if (state.comments && state.comments.length > 0) {
          state.comments = [...state.comments, action.payload];
        } else {
          state.comments = [action.payload];
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'error';
        }
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.error = null;
        if (state.comments && state.comments.length > 0) {
          state.comments = state.comments
            .filter(el => el.id !== action.payload);
        }
      });
  },
});

export default commentsSlice.reducer;
