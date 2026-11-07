/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { createComment } from '../../api/comments';
type ErrorKey = keyof State['errors'];
export interface State {
  loading: boolean;
  name: string;
  email: string;
  text: string;
  postId: number;
  errorApi: string;
  errors: {
    name: null | boolean;
    email: null | boolean;
    text: null | boolean;
  };
}
const initialState: State = {
  loading: false,
  name: '',
  email: '',
  text: '',
  postId: 0,
  errorApi: '',
  errors: {
    name: null,
    email: null,
    text: null,
  },
};

export const creatNewComment = createAsyncThunk(
  'newComment/create',
  async (data: Omit<Comment, 'id'>) => {
    const comment: Comment = await createComment(data);

    return comment;
  },
);
export const newCommentSlice = createSlice({
  name: 'newComment/set',
  initialState,
  reducers: {
    addPostIdNewComment(state, { payload }) {
      state.postId = payload;
    },
    addName(state, { payload }) {
      state.name = payload;
    },
    addEmail(state, { payload }) {
      state.email = payload;
    },
    addText(state, { payload }) {
      state.text = payload;
    },
    checkForErrors(state) {
      const keys = Object.keys(state.errors) as ErrorKey[];

      for (const key of keys) {
        if (state[key].length > 0) {
          state.errors[key] = false;
        } else {
          state.errors[key] = true;
        }
      }
    },
    resetForm(state) {
      state.name = '';
      state.email = '';
      state.text = '';
      state.errors.name = null;
      state.errors.email = null;
      state.errors.text = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(creatNewComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(creatNewComment.fulfilled, state => {
      state.loading = false;
      state.text = '';
      state.errors.text = null;
    });
    builder.addCase(creatNewComment.rejected, (state, action) => {
      state.errorApi = action.error.message || '';
      state.loading = false;
    });
  },
});

export const {
  addName,
  addEmail,
  addText,
  resetForm,
  addPostIdNewComment,
  checkForErrors,
} = newCommentSlice.actions;
export default newCommentSlice.reducer;
