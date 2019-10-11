import { deleteComment } from '../actions';

const deleteCommentFromPost = ids => (dispatch) => {
  dispatch(deleteComment(ids));
};

export default deleteCommentFromPost;
