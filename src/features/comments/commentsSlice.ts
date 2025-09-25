import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

const initialState = {
  comment: [] as Comment[] | [],
  loader: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comment: action.payload };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loader: action.payload,
    }),
    setIsError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      error: action.payload,
    }),
    clear: state => ({
      ...state,
      loader: false,
      error: false,
    }),
  },
});

export const { actions } = commentsSlice;
