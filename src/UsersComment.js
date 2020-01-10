import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment as deleteCommentAction } from './store/postsReducer';

const UsersComment = ({ commentProps, deleteComment }) => (
  <>
    <section className="post__comments--body text">
      {commentProps.body}
      <button
        type="button"
        className="button button--delete"
        onClick={() => deleteComment(commentProps.id)}
      >
          DELETE
      </button>
    </section>
    <section className="post__comments--author author">
      <div className="author--name">
        {` Name: ${commentProps.name}`}
      </div>
      <div className="author--email">
        {`E-mail: ${commentProps.email}`}
      </div>
    </section>
  </>
);

UsersComment.propTypes = {
  commentProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])),
  deleteComment: PropTypes.func.isRequired,
};
UsersComment.defaultProps = { commentProps: [] };

const mapDispatchToProps = dispatch => ({
  deleteComment: id => dispatch(deleteCommentAction(id)),
});

export default connect(null, mapDispatchToProps)(UsersComment);
