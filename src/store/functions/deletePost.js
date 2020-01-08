import { deletePost } from '../actions';

const deletePostFromList = itemId => (dispatch) => {
  dispatch(deletePost(itemId));
};

export default deletePostFromList;
