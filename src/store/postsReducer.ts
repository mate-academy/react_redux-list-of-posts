import {Dispatch, AnyAction } from 'redux';
import { getUserPosts } from '../helpers/api';

// Action types
const SET_POSTS = 'SET_POSTS';
const UPDATE_ACTIVE_POST = 'UPDATE_ACTIVE_POST';
const UPDATE_USER_ID = 'UPDATE_ACTIVE_POST';

// Action creators
export const setPosts = (posts: any[]) => ({ type: SET_POSTS, posts });
export const updateActivePost = (activePostId: number) => ({ type: UPDATE_ACTIVE_POST, activePostId });
export const updateUserId = (userId: number) => ({ type: UPDATE_USER_ID, userId });

// Record posts in state
export const setPostsState = (id: number) => async (dispatch: Dispatch) => {
  await getUserPosts(id)
  .then(posts => dispatch(setPosts(posts)))
}

export const setPostId = (activePostId: number) => (dispatch: Dispatch) => {
  dispatch(updateActivePost(activePostId))
}

export const setUserId = (userId: number) => (dispatch: Dispatch) => {
  dispatch(updateUserId(userId))
}

// Use selector
export const getPostsSelector = (state: RootState) => state.posts.posts;
export const getActivePostId = (state: RootState) => state.posts.activePostId;
export const getUserId = (state: RootState) => state.posts.userId;

export type RootState = {
  posts: any,
  activePostId: number,
  userId: number,
}

const initialState: RootState = {
  posts: [],
  activePostId: 0,
  userId: 0,
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {...state, posts: action.posts};

    case UPDATE_ACTIVE_POST:
      return {...state, activePostId: action.activePostId};

    case UPDATE_USER_ID:
      return {...state, userId: action.userId};

    default:
      return state;
  }
};

export default reducer;
