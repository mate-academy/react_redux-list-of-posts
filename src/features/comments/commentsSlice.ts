import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadAsyncComments = createAsyncThunk<Comment[], number>(
  'comments/loadAsyncComments',
  async (postId: number) => {
    const data = await commentsApi.getComments(postId);

    return data;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      items: action.payload,
    }),
    pushItem: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    filterItem: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(c => c.id !== action.payload),
    }),
    setLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    // FIX: setError updates hasError and payload type is boolean
    setError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(loadAsyncComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(
        loadAsyncComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => ({
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
        }),
      )
      .addCase(loadAsyncComments.rejected, state => ({
        ...state,
        loaded: true, // finished attempting
        hasError: true, // boolean, consistent with UI checks
      }));
  },
});

export const { setItems, pushItem, filterItem, setLoaded, setError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
