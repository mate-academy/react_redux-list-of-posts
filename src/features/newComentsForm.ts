import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Init {
  name: string;
  email: string;
  body: string;
}

const initialState: Init = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentFormSlice = createSlice({
  name: 'commentsForm',
  initialState,
  reducers: {
    setCommentsForm: (
      state,
      action: PayloadAction<{ key: string; value: string }>,
    ) => {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    },
    saveCommentsForm: state => {
      return {
        ...state,
        body: '',
      };
    },
    cleanCommentsForm: () => {
      return {
        name: '',
        email: '',
        body: '',
      };
    },
  },
});

export const { saveCommentsForm, setCommentsForm, cleanCommentsForm } =
  NewCommentFormSlice.actions;
