import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentForm {
  errors: {
    name: boolean;
    email: boolean;
    body: boolean;
  };
  values: {
    name: string;
    email: string;
    body: string;
  };
}

const initialState: CommentForm = {
  errors: {
    name: false,
    email: false,
    body: false,
  },
  values: {
    name: '',
    email: '',
    body: '',
  },
};

type SetErrorPayload = {
  field: keyof CommentForm['errors'];
  value: boolean;
};

type SetValuePayload = {
  field: keyof CommentForm['values'];
  value: string;
};
const commentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    setError: (state, { payload }: PayloadAction<SetErrorPayload>) => {
      const { field, value } = payload;

      return {
        ...state,
        errors: {
          ...state.errors,
          [field]: value,
        },
      };
    },

    setValue: (state, { payload }: PayloadAction<SetValuePayload>) => {
      const { field, value } = payload;

      return {
        ...state,
        values: { ...state.values, [field]: value },
      };
    },
  },
});

export default commentFormSlice.reducer;
export const { setError, setValue } = commentFormSlice.actions;
