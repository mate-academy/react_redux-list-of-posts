import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "./redux/postsReducer";
import User from "./User";
import CommentsList from "./CommentsList";

const Post = ({ post, deletePost }) => (
  <section className="section">
    <div className="post_header">
      <span className="post">Post : {post.id}</span>
      <User user={post.user} />
    </div>
    <button
      type="button"
      onClick={() => deletePost(post.id)}
      className="button"
    >
      delete post
    </button>
    <h2>{post.title}</h2>
    <span></span>
    <p>{post.body}</p>

    <CommentsList comments={post.comments} postId={post.id} />
  </section>
);

const mapDispatchToProps = { deletePost };

export default connect(() => ({}), mapDispatchToProps)(Post);

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired
};
