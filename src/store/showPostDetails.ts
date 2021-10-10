import { AnyAction } from 'redux';
import { Dispatch } from 'react';

import { getPostDetails } from '../api/posts';

const SET_POST_DETAILS = 'SET_POST_DETAILS';
const CLOSE_POST_DETAILS = 'CLOSE_POST_DETAILS';

export const setPostDetails = (url: string) => (dispatch: Dispatch<any>) => {
  getPostDetails(url)
    .then(receivedFromServerPostDetails => {
      dispatch({
        type: SET_POST_DETAILS,
        payload: receivedFromServerPostDetails,
      });
    });
};

export const closePostDetails = () => ({ type: CLOSE_POST_DETAILS });

const initialState: PostDetailsState = {
  postDetails: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    userId: 0,
    title: '',
    body: '',
  },
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POST_DETAILS:
      return {
        ...state,
        postDetails: action.payload,
      };

    case CLOSE_POST_DETAILS:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
