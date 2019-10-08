import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../store';

function Comment({ comment, user, deleteId }) {
  const { name, body, email, id } = comment;
  const userName = user.name;

  return (
    <li className="list-group-item list-group-item-info comment">
      <p className="list-group-item list-group-item-info comment__head">
        <button
          id={id}
          type="button"
          className="btn btn-danger btn-sm"
          onClick={event => deleteId(Number(event.target.id))}
        >
          x
        </button>
        {name}
      </p>
      <p className="list-group-item list-group-item-info comment__body">
        {body}
      </p>
      <p className="list-group-item list-group-item-info comment__user-info">
        {`user: ${userName} (${email})`}
      </p>
    </li>
  );
}

Comment.defaultProps = {
  user: {
    name: 'Guest',
  },
};

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const getMethod = dispatch => ({
  deleteId: id => dispatch(deleteComment(id)),
});

export default connect(
  null,
  getMethod,
)(Comment);
