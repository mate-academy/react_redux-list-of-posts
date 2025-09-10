import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommetsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommetsState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: '',
};

export const loadAsyncComments = createAsyncThunk(
  'users/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pushComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    filterComments: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadAsyncComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      loadAsyncComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadAsyncComments.rejected, state => {
      state.hasError = 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { pushComment, filterComments, setError } = commentsSlice.actions;
