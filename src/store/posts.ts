import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { getPostDetails, getUserPosts } from '../api/posts';
import { actions as isLoadActions } from './isLoad';

const POSTS = 'POSTS';
const POST_ID = 'POST_ID';
const POST_DETAILS = 'POST_DETAILS';

export const selectors = {
  getPostId: (state: RootState) => state.postId,
  getPosts: (state: RootState) => state.posts,
  getPost: (state: RootState) => state.postDetails,
};

export const actions = {
  setPosts: (posts: Post[]) => ({ type: POSTS, posts }),
  setPostId: (postId: number) => ({ type: POST_ID, postId }),
  setPostDetails: (postDetails: Post) => ({ type: POST_DETAILS, postDetails }),
  loadPosts: (id: number) => (dispatch: Dispatch<unknown>) => {
    getUserPosts(id)
      .then((res) => dispatch(actions.setPosts(res)))
      .then(() => dispatch(isLoadActions.setIsLoad(false)));
  },
  loadPostDetails: (id: number) => (dispatch: Dispatch<unknown>) => {
    getPostDetails(id).then((res) => dispatch(actions.setPostDetails(res)));
  },
};

export const postsReducer = (state = {
  userId: 0,
  posts: [],
  postDetails: null,
}, action: AnyAction) => {
  switch (action.type) {
    case POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case POST_ID:
      return {
        ...state,
        postId: action.postId,
      };
    default:
      return state;
  }
};
