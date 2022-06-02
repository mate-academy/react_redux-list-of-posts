import { Dispatch } from 'react';
import { AllActions, Thunk } from '..';

import { getUserByName } from '../../api/users';

import { User } from '../../types/User';

import {
  loadPostsFromServerAction,
  setIsPostListLoadingAction,
  setSelectedPostIdAction,
  setSelectValueAction,
  setVisiblePostsAction,
} from '../PostsReducer/actions';
import { SetUserAction, UserActionTypes } from './actionTypes';

export const setUserAction = (user: User | null): SetUserAction => {
  return ({
    type: UserActionTypes.SetUser,
    user,
  });
};

export const loadUserAction = (name: string) => {
  return async (dispatch: Dispatch<AllActions | Thunk>) => {
    dispatch(setSelectValueAction(name));
    dispatch(setIsPostListLoadingAction(true));
    dispatch(setVisiblePostsAction([]));

    try {
      const userArr = await getUserByName(name);

      dispatch(setUserAction(userArr[0]));
      dispatch(setSelectedPostIdAction(null));

      if (name === 'All users') {
        dispatch(loadPostsFromServerAction());

        return;
      }

      dispatch(loadPostsFromServerAction(userArr[0]));
    } catch (error) {
      dispatch(setUserAction(null));
    }
  };
};
