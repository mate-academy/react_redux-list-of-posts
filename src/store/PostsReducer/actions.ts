import { Dispatch } from 'react';
import { getPostComments } from '../../api/comments';

import {
  getPostDetails,
  getUserPostsByID,
  getUsersPosts,
} from '../../api/posts';

import { Post } from '../../types/Post';
import { User } from '../../types/User';

import { setSelectedPostCommentsAction } from '../CommentsReducer/actions';
import {
  IsPostListLoading,
  IsPostLoading,
  Posts,
  PostsActionTypes,
  SelectedPost,
  SelectedPostId,
  SelectValue,
} from './actionTypes';

export const setSelectedPostIdAction = (id: number | null): SelectedPostId => {
  return ({
    type: PostsActionTypes.setSelectedPostId,
    selectedPostId: id,
  });
};

export const setSelectValueAction = (value: string): SelectValue => {
  return ({
    type: PostsActionTypes.setPostSelectValue,
    selectValue: value,
  });
};

export const setSelectedPostAction = (post: Post | null): SelectedPost => {
  return ({
    type: PostsActionTypes.setSelectPost,
    selectedPost: post,
  });
};

export const setIsPostLoadingAction = (boolean: boolean): IsPostLoading => {
  return ({
    type: PostsActionTypes.setIsPostLoading,
    isPostLoading: boolean,
  });
};

export const setPostsAction = (posts: Post[]): Posts => {
  return ({
    type: PostsActionTypes.setPosts,
    posts,
  });
};

export const setIsPostListLoadingAction = (
  boolean: boolean,
): IsPostListLoading => {
  return ({
    type: PostsActionTypes.setIsPostListLoading,
    isPostListLoading: boolean,
  });
};

export const loadPostsFromServerAction = (
  user: User | null = null,
) => {
  return async (dispatch: Dispatch<any>) => {
    if (user) {
      try {
        if (user !== null) {
          const userPosts = await getUserPostsByID(user.id);

          dispatch(setPostsAction(userPosts));
          dispatch(setIsPostListLoadingAction(false));
        }
      } catch (error) {
        dispatch(setPostsAction([]));
        dispatch(setIsPostListLoadingAction(false));
      }
    } else {
      try {
        const allPosts = await getUsersPosts();

        dispatch(setIsPostListLoadingAction(false));
        dispatch(setPostsAction(allPosts));
      } catch (error) {
        dispatch(setPostsAction([]));
      }
    }
  };
};

export const loadPostFromServerByIDAction = (
  id: number,
  selectedPostId: number | null,
) => {
  return async (dispatch: Dispatch<any>) => {
    if (selectedPostId === id) {
      dispatch(setIsPostLoadingAction(false));
      dispatch(setSelectedPostIdAction(null));
      dispatch(setSelectedPostAction(null));
      dispatch(setSelectedPostCommentsAction([]));

      return;
    }

    dispatch(setIsPostLoadingAction(true));
    dispatch(setSelectedPostIdAction(id));

    try {
      const commentsPromise = getPostComments(id);
      const currentPost = await getPostDetails(id);
      const currentPostComments = await commentsPromise;

      dispatch(setIsPostLoadingAction(false));
      dispatch(setSelectedPostAction(currentPost));
      dispatch(setSelectedPostCommentsAction(currentPostComments));
    } catch (error) {
      dispatch(setIsPostLoadingAction(false));
      dispatch(setSelectedPostAction(null));
      dispatch(setSelectedPostCommentsAction([]));
    }
  };
};
