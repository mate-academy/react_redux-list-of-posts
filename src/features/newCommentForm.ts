/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  values: {
    name: '',
    email: '',
    body: '',
  },
  errors: {
    name: false,
    email: false,
    body: false,
  },
};
// const initialState = {
//   nameError: false,
//   emailError: false,
//   bodyError: false,
//   name: '',
//   email: '',
//   body: '',
// };

export const newCommentFormSlice = createSlice({
  name: 'NewCommentFormSlice',
  initialState,
  reducers: {
    // setError: (state, action: PayloadAction) => {
    //   // Object.keys(action.payload).forEach(key => {
    //   //   if (key in state) {
    //   //     state[key] = action.payload[key];
    //   //   }
    //   // });
    // },
    // setError: (
    //   state,
    //   action: PayloadAction<{ key: keyof typeof state.errors; value: boolean }>,
    // ) => {
    //   const { key, value } = action.payload;

    //   state.errors[key] = value;
    // },
    setError: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      Object.keys(action.payload).forEach(key => {
        if (key in state.errors) {
          state.errors[key as keyof typeof state.errors] = action.payload[key];
        }
      });
    },
    setValue: (
      state,
      action: PayloadAction<{ key: keyof typeof state.values; value: string }>,
    ) => {
      const { key, value } = action.payload;

      state.values[key] = value;
    },
    clearFormFields: state => {
      Object.keys(state.errors).forEach(key => {
        state.errors[key as keyof typeof state.errors] = false;
      });
      Object.keys(state.values).forEach(key => {
        state.values[key as keyof typeof state.values] = '';
      });
      // state.errors.body = false;
      // state.errors.email = false;
      // state.errors.name = false;
      // state.values.body = '';
      // state.values.email = '';
      // state.values.name = '';
    },
  },
});

export default newCommentFormSlice.reducer;
export const { setError, setValue, clearFormFields } =
  newCommentFormSlice.actions;
