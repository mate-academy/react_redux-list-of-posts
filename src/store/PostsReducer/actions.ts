import { Post } from '../../types/Post';
import { User } from '../../types/User';

export const SET_USER = 'SET_USER';
export const SET_SELECTED_POST_ID = 'SET_SELECTED_POST_ID';
export const SET_POST_SELECT_VALUE = 'SET_SELECT_VALUE';
export const SET_SELECTED_POST = 'SET_SELECTED_POST';
export const SET_IS_POST_LOADING = 'SET_IS_POST_LOADING';

export const setUserAction = (user: User | null) => {
  return ({
    type: SET_USER,
    user,
  });
};

export const setSelectedPostIdAction = (id: number | null) => {
  return ({
    type: SET_SELECTED_POST_ID,
    selectedPostId: id,
  });
};

export const setSelectValueAction = (value: string) => {
  return ({
    type: SET_POST_SELECT_VALUE,
    selectValue: value,
  });
};

export const setSelectedPostAction = (post: Post | null) => {
  return ({
    type: SET_SELECTED_POST,
    selectedPost: post,
  });
};

export const setIsPostLoadingAction = (boolean: boolean) => {
  return ({
    type: SET_IS_POST_LOADING,
    isPostLoading: boolean,
  });
};
