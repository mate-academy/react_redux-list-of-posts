import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
    setCommLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setCommError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(fetchComments.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }));
    builder.addCase(fetchComments.rejected, state => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export const { setComments, setCommLoaded, setCommError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
