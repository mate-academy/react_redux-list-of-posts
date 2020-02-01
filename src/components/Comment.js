import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { commentDelete } from './redux/actions';

const Comment = ({ comment, deleteComment }) => {
  const commentDeletor = (e, commentId) => {
    e.preventDefault();
    deleteComment(commentId);
  };

  return (
    <tr>
      <td>
        <p>
          Author:
          {comment.name}
        </p>
        <p>
          Email:
          {comment.email}
        </p>
      </td>
      <td>{comment.body}</td>
      <td>
        <Button icon>
          <Icon
            name="delete"
            onClick={e => commentDeletor(e, comment.id)}
          />
        </Button>
      </td>
    </tr>
  );
};

const mapDispatch2Props = dispatch => ({
  deleteComment: commentId => dispatch(commentDelete(commentId)),
});

const Comments = connect(
  null,
  mapDispatch2Props,
)(Comment);

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comments;
