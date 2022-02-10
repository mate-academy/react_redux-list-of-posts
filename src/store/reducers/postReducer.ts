import { Dispatch } from 'react';
import { PostAction, PostActionTypes, PostState } from '../types/post';
import { deleteOnePost, getPostDetails, getPosts } from '../../api/posts';

const initialState: PostState = {
  posts: [],
  isLoadingPosts: false,
  isLoadingPost: false,
  selectedPost: null,
  selectedPostId: 0,
};

export const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionTypes.LOADING_POSTS:
      return { ...state, isLoadingPosts: true };
    case PostActionTypes.LOADING_POSTS_SUCCESS:
      return { ...state, posts: action.payload, isLoadingPosts: false };
    case PostActionTypes.CHANGE_POSTID:
      return { ...state, selectedPostId: action.payload };
    case PostActionTypes.LOADING_POST:
      return { ...state, isLoadingPost: true };
    case PostActionTypes.LOADING_POST_SUCCESS:
      return { ...state, selectedPost: action.payload, isLoadingPost: false };
    case PostActionTypes.DELETE_POST:
      return { ...state, posts: [...state.posts.filter(post => post.id !== action.payload)] };
    default:
      return state;
  }
};

export const loadPosts = (userId: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: PostActionTypes.LOADING_POSTS });
      const posts = await getPosts(userId);

      dispatch({ type: PostActionTypes.LOADING_POSTS_SUCCESS, payload: posts });
    } catch {
      // eslint-disable-next-line
      console.log('Fething posts error');
    }
  };
};

export const loadPost = (postId: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    dispatch({ type: PostActionTypes.LOADING_POST });
    const post = await getPostDetails(postId);

    dispatch({ type: PostActionTypes.LOADING_POST_SUCCESS, payload: post });
  };
};

export const deletePost = (postId: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    await deleteOnePost(postId);

    dispatch({ type: PostActionTypes.DELETE_POST, payload: postId });
  };
};
