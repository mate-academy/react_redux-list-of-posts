import { AnyAction, Dispatch } from 'redux';

import { Post, PostMain, User } from '../types';
import { getPosts, getPostDetails } from '../helpers/posts';
import { getPostComments } from '../helpers/comments';

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

// Selectors
export const getSelectedUserId = (state: RootState) => state.userId;
export const getPostId = (state: RootState) => state.selectedPostId;

export const fetchPosts = (
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userId?: number
) => (dispatch: Dispatch) => {
  // setIsLoading(true);
  getPosts(userId).then((res: any) => {
    dispatch(setPosts(res)); // res.data
    // setIsLoading(false);
  });
};

export const fetchPost = (
  postId: number,
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => (dispatch: Dispatch) => {
  // setLoading(true);
  // console.log(typeof request2, typeof dispatch, id);
  Promise.all([getPostDetails(postId), getPostComments(postId)]).then(res => {
    // const postDetails = {
    //   ...res,
    //   commentsCount: 22
    // };
    dispatch(setPost({
      ...res[0],
      commentsCount: res[1].length
    }));
  }, reason => {
    console.error(`Failed to fetch details of post ${postId}.`, reason);
  });
  // getPostDetails(postId).then((res: any) => {
  //   postDetails = res;
  //   getPostComments(postId)
  // });

  //dispatch(setPost(res));
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
