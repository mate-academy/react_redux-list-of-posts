import { Dispatch } from 'react';

import { getUserByName } from '../../api/users';

import { User } from '../../types/User';

import {
  loadPostsFromServerAction,
  setIsPostListLoadingAction,
  setSelectedPostIdAction,
  setSelectValueAction,
} from '../PostsReducer/actions';
import { SetUserAction, UserActionTypes } from './actionTypes';

export const setUserAction = (user: User | null): SetUserAction => {
  return ({
    type: UserActionTypes.SetUser,
    user,
  });
};

export const loadUserAction = (name: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setSelectValueAction(name));
    dispatch(setUserAction(null));

    try {
      const userArr = await getUserByName(name);

      dispatch(setUserAction(userArr[0]));
      dispatch(setSelectedPostIdAction(null));
      dispatch(
        setIsPostListLoadingAction(true),
      );

      if (name === 'All users') {
        dispatch(loadPostsFromServerAction());

        return;
      }

      dispatch(loadPostsFromServerAction(userArr[0]));
      dispatch(setIsPostListLoadingAction(false));
    } catch (error) {
      dispatch(setUserAction(null));
    }
  };
};
