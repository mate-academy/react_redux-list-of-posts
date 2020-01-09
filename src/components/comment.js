import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteComment } from '../actions';
import { getDeleteComment } from '../store/posts';

const SingleComment = ({ title, body, email, id, removeComment }) => (
  <section className="comment">
    <h4 className="comment__header">
      <DeleteIcon
        className="button_delete"
        onClick={() => removeComment(id)}
      />
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
  posts: getDeleteComment(state.posts),
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
