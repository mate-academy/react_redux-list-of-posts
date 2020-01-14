import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "./redux/postsReducer";

const Comment = ({ comment, deleteComment, postID }) => (
  <div className="comment">
    <p>{comment.name}</p>
    <p>{comment.body}</p>
    <a href={comment.email}>{comment.email}</a>
    <button
      className="button"
      type="button"
      onClick={() => deleteComment(postID, comment.id)}
    >
      delete comment
    </button>
  </div>
);

const mapDispatchToProps = { deleteComment };

export default connect(() => ({}), mapDispatchToProps)(Comment);

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string
  }).isRequired
};
