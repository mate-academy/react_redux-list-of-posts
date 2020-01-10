import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Comments from './Comments';
import { deletePost as deletePostAction } from './store/postsReducer';

const Post = ({ postElems, deletePost }) => (
  <>
    <h1 className="post__title title">
      <button
        type="button"
        className="button button--delete"
        onClick={() => deletePost(postElems.id)}
      >
          DELETE
      </button>
      {postElems.title}
    </h1>
    <section className="post__user author">
      <User user={postElems.user} />
    </section>
    <article className="post__body text">
      {postElems.body}
    </article>
    <Comments comments={postElems.postComments} />
  </>
);

Post.propTypes = {
  postElems: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])),
  deletePost: PropTypes.func.isRequired,
};
Post.defaultProps = { postElems: [] };

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePostAction(id)),
});

export default connect(null, mapDispatchToProps)(Post);
