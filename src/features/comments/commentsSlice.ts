import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  },
);

type InitialState = {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: InitialState = {
  items: [],
  hasError: false,
  loaded: true,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => ({
      ...state,
      hasError: false,
      loaded: false,
    }));

    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }),
    );

    builder.addCase(fetchComments.rejected, state => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
