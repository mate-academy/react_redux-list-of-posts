import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Comments = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: Comments = {
  loaded: false,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }: PayloadAction<Comment>) => {
      return { ...state, items: [...state.items, payload] };
    },
    deleteCom: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload),
      };
    },

    setError: (state, { payload }: PayloadAction<boolean>) => {
      return { ...state, hasError: payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: true, hasError: false };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: false };
    });
    builder.addCase(init.rejected, state => {
      return { ...state, hasError: true, loaded: false };
    });
  },
});

export default commentsSlice.reducer;
export const { setComments, setError, deleteCom } = commentsSlice.actions;
