import { AnyAction, Dispatch } from 'redux';

import { Post, PostMain, User } from '../types';
import { getPosts, getPostDetails } from '../api/posts';
import { getPostComments } from '../api/comments';
import { finishLoading, startLoading } from './loading';

export type RootState = {
  posts: any,
  post: PostMain | null;
  selectedPostId: number,
  userId: number,
  users: User[]
}

const initialState: RootState = {
  posts: [],
  post: null,
  selectedPostId: 0,
  userId: 0,
  users: [],
}

const SET_USERID = 'SET_USERID';
const SET_USERS = 'SET_USERS';
const SET_POSTS = 'SET_POSTS';
const SET_POST = "SET_POST";
const SET_POSTID = 'SET_POSTID';

// Action creators
export const setSelectedUserId = (userId: number) => ({ type: SET_USERID, value: userId });
export const setUsersList = (users: User[]) => ({ type: SET_USERS, value: users });
export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, posts });
export const setPost = (post: PostMain) => ({ type: SET_POST, post });
export const setPostId = (selectedPostId: number) => ({ type: SET_POSTID, value: selectedPostId });

export const fetchPosts = (
  userId?: number
) => (dispatch: Dispatch) => {
  dispatch(startLoading());
  getPosts(userId).then((res: any) => {
    dispatch(setPosts(res));
    dispatch(finishLoading());
  });
};

export const fetchPost = (
  postId: number,
) => (dispatch: Dispatch) => {
  dispatch(startLoading());
  Promise.all([getPostDetails(postId), getPostComments(postId)]).then(res => {
    dispatch(finishLoading());
    dispatch(setPost({
      ...res[0],
      commentsCount: res[1].length
    }));
  }, reason => {
    // We can also set message action for that (messageReducer)
    console.error(`Failed to fetch details of post ${postId}.`, reason);
  });
};

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USERID:
      return {
        ...state,
        userId: action.value
      }

    case SET_USERS:
      return {
        ...state,
        users: action.value
      }
    
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    
    case SET_POST:
      return {
        ...state,
        post: action.post
      };

    case SET_POSTID:
      return {
        ...state,
        selectedPostId: action.value
      };

    default:
      return state;
  }
}
