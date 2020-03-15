import { Dispatch } from 'redux';

import { ActionType } from '../constants/types';
import { getPosts } from '../utils/helpers';

export const setInputValue = (inputValue: string) => ({
  type: ActionType.SetInputValue,
  payload: inputValue,
});

export const setFilterValue = (filterValue: string) => ({
  type: ActionType.SetFilterValue,
  payload: filterValue,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: ActionType.SetIsLoading,
  payload: isLoading,
});

export const setIsLoadSuccess = (isLoadSuccess: boolean) => ({
  type: ActionType.SetIsLoadSuccess,
  payload: isLoadSuccess,
});

export const setIsLoadError = (isLoadError: boolean) => ({
  type: ActionType.SetIsLoadError,
  payload: isLoadError,
});

export const loadData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const posts = await getPosts();

      dispatch({
        type: ActionType.LoadData,
        payload: posts,
      });
      dispatch(setIsLoadSuccess(true));
    } catch (error) {
      dispatch(setIsLoadError(true));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const deletePost = (id: number) => ({
  type: ActionType.DeletePost,
  payload: id,
});

export const deleteComment = (postId: number, commentId: number) => ({
  type: ActionType.DeleteComment,
  payload: {
    postId,
    commentId,
  },
});
