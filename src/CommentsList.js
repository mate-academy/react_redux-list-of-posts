import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentsList = ({ postId, comments }) => (
  <div>
    <h3 className="comment-title">Comments</h3>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} postID={postId} />
    ))}
  </div>
);

CommentsList.propTypes = {
  postId: PropTypes.any.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default CommentsList;
