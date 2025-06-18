import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPostComments } from "../../api/comments";

export type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      return { ...state, visible: action.payload };
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, items: action.payload, loaded: true, hasError: false };
    }
  },
});

export const { actions } = commentSlice;
