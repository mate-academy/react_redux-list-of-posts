import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComment = createAsyncThunk(
  'comments/fetchComment',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,

    setComments(state, { payload }: PayloadAction<Comment>) {
      state.items.push(payload);
    },

    removeComment(state, { payload }: PayloadAction<number>) {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== payload),
      };
    },

    setCommentsError(state) {
      return {
        ...state,
        hasError: true,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComment.pending, state => {
      return {
        ...state,
        items: [],
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(fetchComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(fetchComment.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export default commentsSlice.reducer;

export const { clearComments, setComments, removeComment, setCommentsError } =
  commentsSlice.actions;
