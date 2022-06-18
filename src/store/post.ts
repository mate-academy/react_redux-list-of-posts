import { AnyAction } from 'redux';

const SET_POST = 'SET_POST';

export const setPost = (post: Posts) => ({ type: SET_POST, post });

const reducer = (post = {
  id: 0,
  userId: 0,
  title: '',
  body: '',
}, action: AnyAction) => {
  switch (action.type) {
    case SET_POST:
      return action.post;

    default:
      return post;
  }
};

export default reducer;
