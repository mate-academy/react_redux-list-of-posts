/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';

export interface SubmitState {
  newComment: Comment | null;
  error: string;
  newData: {
    name: string;
    email: string;
    body: string;
  };
  dataError: {
    name: boolean;
    email: boolean;
    body: boolean;
  };
}

export const initialState: SubmitState = {
  newComment: null,
  error: '',
  newData: {
    name: '',
    email: '',
    body: '',
  },
  dataError: {
    name: false,
    email: false,
    body: false,
  },
};

export const submitSlice = createSlice({
  name: 'submit',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ [key: string]: string }>) => {
      const field = Object.keys(action.payload)[0];
      const value = action.payload[field];

      return {
        ...state,
        newData: {
          ...state.newData,
          [field]: value,
        },
      };
    },

    setErrors: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      const field = Object.keys(action.payload)[0];
      const error = action.payload[field];

      return {
        ...state,
        dataError: {
          ...state.dataError,
          [field]: error,
        },
      };
    },

    clearNewData: state => {
      state.newData.name = '';
      state.newData.email = '';
      state.newData.body = '';
    },

    clearDataError: state => {
      state.dataError.body = false;
      state.dataError.email = false;
      state.dataError.name = false;
    },
  },
});

export const selectNewComment = (state: RootState) => state.newCommentForm;

export const { clearDataError, clearNewData, setValue, setErrors } =
  submitSlice.actions;

export default submitSlice.reducer;
