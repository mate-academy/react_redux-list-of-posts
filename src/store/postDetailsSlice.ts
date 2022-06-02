// there I imported rootState from store because i use it in selectors for this inner state

/* eslint-disable import/no-cycle */

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

/* eslint-disable no-param-reassign */

// i use action before initialization in thunk so i need it to off warning of linter

/* eslint-disable @typescript-eslint/no-use-before-define */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getPostDetailsById } from '../api/posts';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import {
  getPostCommentsById,
  removePostCommetById,
  addPostCommentById,
} from '../api/comments';

interface PostDetailsState {
  selectedPostDetails: Post | null;
  commentsForSelectedPost: Array<Comment>;
  someCommentIsDeleting: boolean;
  commentsIsShowing: boolean;
}

const initialState: PostDetailsState = {
  selectedPostDetails: null,
  commentsForSelectedPost: [],
  someCommentIsDeleting: false,
  commentsIsShowing: true,
};

export const fetchPostDetails = createAsyncThunk(
  'PostDetailsState/fetchUserPostsById',
  async (postId: number, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setSelectedPostDetails(null));

    const [post, comments] = await Promise.all([
      getPostDetailsById(postId),
      getPostCommentsById(postId),
    ]);

    dispatch(setSelectedPostDetails(post));
    dispatch(setCommentsForSelectedPost(comments));
  },
);

export const removeCommentInSelectedPostById = createAsyncThunk(
  'PostDetailsState/removeCommentInSelectedPostById',
  async (commentId: number, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const readonlyState = thunkAPI.getState() as RootState;
    const filteredComments = readonlyState.postDetails.commentsForSelectedPost
      .filter(comment => comment.id !== commentId);

    dispatch(setSomeCommentIsDeleting(true));
    await removePostCommetById(commentId);
    dispatch(setCommentsForSelectedPost(filteredComments));
    dispatch(setSomeCommentIsDeleting(false));
  },
);

export const addCommentInSelectedPost = createAsyncThunk(
  'PostDetailsState/addCommentInSelectedPost',
  async (comment: Omit<Comment, 'id'>, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const readonlyState = thunkAPI.getState() as RootState;
    const prevComments = readonlyState.postDetails.commentsForSelectedPost;
    const filteredComments = [
      ...prevComments,
      { ...comment, id: prevComments.length + 1 }];

    dispatch(setSomeCommentIsDeleting(true));
    await addPostCommentById(comment);
    dispatch(setCommentsForSelectedPost(filteredComments));
    dispatch(setSomeCommentIsDeleting(false));
  },
);

export const postDetails = createSlice({
  name: 'listOfPosts',
  initialState,
  reducers: {
    setSelectedPostDetails: (state, action: PayloadAction<Post | null>) => {
      state.selectedPostDetails = action.payload;
    },

    setCommentsForSelectedPost:
    (state, action: PayloadAction<Array<Comment>>) => {
      state.commentsForSelectedPost = action.payload;
    },

    setSomeCommentIsDeleting: (state, action: PayloadAction<boolean>) => {
      state.someCommentIsDeleting = action.payload;
    },

    setCommentsIsShowing: (state, action: PayloadAction<boolean>) => {
      state.commentsIsShowing = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPostDetails.fulfilled, () => {
    });
  },
});

export const {
  setSelectedPostDetails,
  setCommentsForSelectedPost,
  setSomeCommentIsDeleting,
  setCommentsIsShowing,
} = postDetails.actions;

export const selectors = {
  getSelectedPostDetails: (state: RootState) => {
    return state.postDetails.selectedPostDetails;
  },

  getCommentsForSelectedPost: (state: RootState) => {
    return state.postDetails.commentsForSelectedPost;
  },

  getSomeCommentIsDeleting: (state: RootState) => {
    return state.postDetails.someCommentIsDeleting;
  },

  getCommentsIsShowing: (state: RootState) => {
    return state.postDetails.commentsIsShowing;
  },
};

export default postDetails.reducer;
