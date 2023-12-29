import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostCommnetsThunk } from '../../thunks/CommentsThunks';

export interface CommentsState {
  comments: Comment[];
  loading: boolean,
  error: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload,
      };
    },
    commentError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostCommnetsThunk.pending, (state) => {
      return {
        ...state,
        loading: false,
        error: false,
      };
    });

    builder.addCase(getPostCommnetsThunk.fulfilled, (state, action) => {
      return {
        ...state,
        loading: true,
        comments: action.payload,
      };
    });

    builder.addCase(getPostCommnetsThunk.rejected, (state) => {
      return {
        ...state,
        loading: true,
        error: true,
      };
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
