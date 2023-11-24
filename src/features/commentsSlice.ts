import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (
      state, action: PayloadAction<Comment[]>,
    ) => {
      return {
        ...state,
        comments: action.payload,
      };
    },
    addLoaded: (
      state, action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    addError: (
      state, action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    addVissible: (
      state, action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        visible: action.payload,
      };
    },
    setComment: (
      state, action: PayloadAction<Comment>,
    ) => {
      state.comments.push(action.payload);
    },
    removeComment: (
      state, action: PayloadAction<number>,
    ) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };
    },
    clearAllComments: (state) => {
      return {
        ...state,
        comments: [],
      };
    },
  },
});

export const {
  addComments,
  addLoaded,
  addError,
  addVissible,
  setComment,
  removeComment,
  clearAllComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;
