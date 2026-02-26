import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface Comments {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: Comments = {
  comments: [],
  loaded: false,
  hasError: false,
}

export const fetchPostComments = createAsyncThunk('comments/fetch', (postId: number) => getPostComments(postId))

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchPostComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    })
  }
})


export default commentsSlice.reducer;
