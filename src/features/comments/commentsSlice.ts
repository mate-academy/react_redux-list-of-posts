/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiFeatureState } from '../../types/ApiFeatureState';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';
import { RootState } from '../../app/store';

type State = ApiFeatureState<Comment[]>;

const REDUCER_NAME = 'comments';

const initialState: State = {
  hasError: false,
  loaded: false,
  items: [],
};

export const commentsSlice = createSlice({
  initialState,
  name: REDUCER_NAME,
  reducers: {
    set: (state, { payload }: PayloadAction<Comment[]>) => {
      return { ...state, items: payload };
    },
    setLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.loaded = payload;
    },
    setHasError: (state, { payload }: PayloadAction<boolean>) => {
      state.hasError = payload;
    },
    deleteItem: (state, { payload }: PayloadAction<Comment['id']>) => {
      state.items = state.items.filter(item => item.id !== payload);
    },
    addItem: (state, { payload }: PayloadAction<Comment>) => {
      state.items.push(payload);
    },
  },
});

const { set, setHasError, setLoaded, deleteItem, addItem } =
  commentsSlice.actions;

export const selectors = {
  selectAll: (state: RootState) => state.comments,
};

export const actions = {
  get: createAsyncThunk(
    `${REDUCER_NAME}/get`,
    async (postId: number, { dispatch }) => {
      dispatch(setHasError(false));
      dispatch(setLoaded(false));

      try {
        const result = await commentsApi.getPostComments(postId);

        dispatch(set(result));
      } catch (error) {
        dispatch(setHasError(true));
      } finally {
        dispatch(setLoaded(true));
      }
    },
  ),

  create: createAsyncThunk(
    `${REDUCER_NAME}/create`,
    async (commentData: Omit<Comment, 'id'>, { dispatch }) => {
      try {
        const newComment = await commentsApi.createComment(commentData);

        dispatch(addItem(newComment));
      } catch (error) {
        dispatch(setHasError(true));
      }
    },
  ),

  delete: createAsyncThunk(
    `${REDUCER_NAME}/delete`,
    async (commentId: number, { getState, dispatch }) => {
      const currentComments = (getState() as RootState).comments.items;

      try {
        dispatch(deleteItem(commentId));

        await commentsApi.deleteComment(commentId);
      } catch (error) {
        dispatch(setHasError(true));
        dispatch(set(currentComments));
      }
    },
  ),
};
