import { Dispatch } from 'react';

import { AllActions, Thunk } from '..';

import { getPostComments } from '../../api/comments';

import {
  deletePostByID,
  getPostDetails,
  getUserPostsByID,
  getUsersPosts,
} from '../../api/posts';

import { Post } from '../../types/Post';
import { User } from '../../types/User';

import { setSelectedPostCommentsAction } from '../CommentsReducer/actions';
import {
  PostsDeleteTargets,
  IsPostListLoading,
  IsPostLoading,
  Posts,
  PostsActionTypes,
  PostTitleQuery,
  SelectedPost,
  SelectedPostId,
  SelectValue,
  VisiblePosts,
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

export const setPostTitleQueryAction = (titleQuery: string): PostTitleQuery => {
  return ({
    type: PostsActionTypes.setPostTitleQuery,
    titleQuery,
  });
};

export const setVisiblePostsAction = (posts: Post[]): VisiblePosts => {
  return ({
    type: PostsActionTypes.setVisiblePosts,
    visiblePosts: posts,
  });
};

export const setPostsDeleteTargetsAction = (
  id: number,
  push: boolean,
): PostsDeleteTargets => {
  return ({
    type: PostsActionTypes.setPostsDeleteTargets,
    id,
    push,
  });
};

export const loadPostsFromServerAction = (
  user: User | null = null,
  id: number | undefined = undefined,
) => {
  return async (dispatch: Dispatch<AllActions>) => {
    try {
      if (user) {
        const userPosts = await getUserPostsByID(user.id);

        dispatch(setVisiblePostsAction(userPosts));
        dispatch(setPostsAction(userPosts));
        dispatch(setIsPostListLoadingAction(false));

        if (id) {
          dispatch(setPostsDeleteTargetsAction(id, false));
        }

        return;
      }

      const allPosts = await getUsersPosts();

      dispatch(setVisiblePostsAction(allPosts));
      dispatch(setPostsAction(allPosts));
      dispatch(setIsPostListLoadingAction(false));

      if (id) {
        dispatch(setPostsDeleteTargetsAction(id, false));
      }
    } catch (error) {
      dispatch(setPostsAction([]));
      dispatch(setIsPostListLoadingAction(false));
    }
  };
};

export const loadPostFromServerByIDAction = (
  id: number,
  selectedPostId: number | null,
) => {
  return async (dispatch: Dispatch<AllActions>) => {
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

      dispatch(setSelectedPostAction(currentPost));
      dispatch(setSelectedPostCommentsAction(currentPostComments));
      dispatch(setIsPostLoadingAction(false));
    } catch (error) {
      dispatch(setIsPostLoadingAction(false));
      dispatch(setSelectedPostAction(null));
      dispatch(setSelectedPostCommentsAction([]));
    }
  };
};

export const filterVisiblePostsAction = (
  query: string,
  posts: Post[],
) => {
  return (dispatch: Dispatch<AllActions>) => {
    dispatch(setPostTitleQueryAction(query));

    const lowerQuery = query.toLowerCase();
    const result = [...posts].filter(post => {
      const lowerTitle = post.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });

    dispatch(setVisiblePostsAction(result));
  };
};

export const deletePostAction = (
  id: number,
  user: User | null,
) => {
  return async (dispatch: Dispatch<AllActions | Thunk>) => {
    dispatch(setPostsDeleteTargetsAction(id, true));

    await deletePostByID(id);

    dispatch(loadPostsFromServerAction(user, id));
  };
};
