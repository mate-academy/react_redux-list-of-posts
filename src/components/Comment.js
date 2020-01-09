import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createActionDeleteComment } from '../store/store';

const Comment = ({ postId, deleteComment, comment: { id, name, email, body } }) => (
  <section className="comment">
    <section className="title">
      <button
        type="button"
        className="delete"
        onClick={() => deleteComment(postId, id)}
      >
        x
      </button>
      <h3 className="comment__title">
        {name}
      </h3>
    </section>

    <section className="comment__main-part">
      <p>
        {email}
      </p>

      <p className="comment__body">
        {body}
      </p>
    </section>
  </section>
);

const mapDispatchToProps = {
  deleteComment: createActionDeleteComment,
};

export default connect(() => ({}), mapDispatchToProps)(Comment);

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
