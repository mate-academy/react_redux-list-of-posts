import { AnyAction } from 'redux';
import { Post } from '../helpers/interfaces';

const ADD_POST = 'ADD_POST';

export const addPost = (newPost: Post) => ({ type: ADD_POST, newPost});

const reducer = (newPost = null, action: AnyAction) => {
  switch (action.type) {
    case ADD_POST:
      return action.newPost;

    default:
      return newPost;
  }
};

export default reducer;
