/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { createComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { addComment } from '../Comments/commentsSlice';

export interface FormObj {
  name: string;
  email: string;
  body: string;
}

export interface FormErrors {
  name: boolean;
  email: boolean;
  body: boolean;
}

export interface CommmentFormState {
  value: FormObj;
  errors: FormErrors;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommmentFormState = {
  value: {
    name: '',
    email: '',
    body: '',
  },
  errors: {
    name: false,
    email: false,
    body: false,
  },
  status: 'idle',
};

type ErrorPayload = { field: keyof FormObj; value: boolean };

export const AsyncPostComment = createAsyncThunk(
  'commentForm/createComment',
  async (comment: Omit<Comment, 'id'>, { dispatch }) => {
    const value = await createComment(comment);

    if (value) {
      dispatch(addComment(value));
    }

    return value;
  },
);

export const commentFormSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    clearForm: state => {
      state.errors = {
        name: false,
        email: false,
        body: false,
      };
      state.value = {
        name: '',
        email: '',
        body: '',
      };
    },
    setErrors: (state, action?: PayloadAction<ErrorPayload | undefined>) => {
      if (action?.payload) {
        state.errors = {
          ...state.errors,
          [action.payload.field]: action.payload.value,
        };
      } else {
        state.errors = {
          name: false,
          email: false,
          body: false,
        };
      }
    },
    setInputs: (state, action: PayloadAction<ErrorPayload>) => {
      state.value = {
        ...state.value,
        [action.payload.field]: action.payload.value,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(AsyncPostComment.pending, state => {
        state.status = 'loading';
      })
      .addCase(AsyncPostComment.fulfilled, state => {
        state.status = 'idle';
        state.value = {
          name: '',
          email: '',
          body: '',
        };
      })
      .addCase(AsyncPostComment.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { clearForm, setInputs, setErrors } = commentFormSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default commentFormSlice.reducer;
