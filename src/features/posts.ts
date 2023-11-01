import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

type State = {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
};

const initialState: State = {
  loaded: true,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk('fetchPosts', getPosts);

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state: State) => {
      // eslint-disable-next-line
      state.loaded = false;
    });

    builder.addCase(fetchPosts.rejected, (state: State) => {
      /* eslint-disable */
      state.hasError = true;
      state.loaded = true;
      /* eslint-enable */
    });

    builder.addCase(
      fetchPosts.fulfilled,
      (state: State, action: PayloadAction<Post[]>) => {
        /* eslint-disable */
        state.items = action.payload;
        state.loaded = true;
        /* eslint-enable */
      },
    );
  },
});

export default postsSlice.reducer;
