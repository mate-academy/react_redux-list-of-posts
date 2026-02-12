import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';
import { client } from '../utils/fetchClient';

type CommentsState = {
  items: Comment[];
  loading: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  visible: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const response = await client.get<Comment[]>(`/comments?postId=${postId}`);

    return response;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleVisibility(state) {
      return {
        ...state,
        visible: !state.visible,
      };
    },
    addComment(state, action: PayloadAction<Comment>) {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(
        fetchPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          return {
            ...state,
            loading: false,
            items: action.payload,
          };
        },
      )
      .addCase(fetchPostComments.rejected, state => {
        return {
          ...state,
          loading: false,
        };
      });
  },
});

export const { toggleVisibility, addComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
