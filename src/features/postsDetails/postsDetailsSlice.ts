import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const commentsThunk = createAsyncThunk('coments/getPostComments',
  async (id: number) => {
    const fetchComments = await getPostComments(id);

    return fetchComments;
  });

type DetailsSlice = {
  comments: Comment[],
  loadingComment: boolean,
  error: string,
};

const initialState: DetailsSlice = {
  comments: [],
  loadingComment: false,
  error: '',
};

const postsDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetials: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload; // eslint-disable-line
    },
  },

  extraReducers: (builder) => {
    builder.addCase(commentsThunk.pending, (state) => {
      const result = state;

      result.loadingComment = true;
    });

    builder.addCase(commentsThunk.fulfilled, (state, action) => {
      const result = state;

      result.loadingComment = false;
      result.comments = action.payload;
    });

    builder.addCase(commentsThunk.rejected, (state) => {
      const result = state;

      result.loadingComment = false;
      result.error = 'Something went wrong!';
    });
  },
});

export const { setDetials } = postsDetailsSlice.actions;
export default postsDetailsSlice.reducer;
