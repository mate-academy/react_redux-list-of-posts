import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteComment } from '../actions';

const SingleComment = ({ title, body, email, id, removeComment }) => (
  <section className="comment">
    <h4 className="comment__header">
      <button
        className="post__delete"
        type="button"
        onClick={() => removeComment(id)}
      >
        <DeleteIcon />
      </button>
      {title}
    </h4>
    <article>{body}</article>
    <a
      className="comment__email"
      href="/#"
    >
      {email}
    </a>

  </section>
);

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  removeComment: deleteComment,
};

SingleComment.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleComment);
