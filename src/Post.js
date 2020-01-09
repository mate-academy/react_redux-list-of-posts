import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getQuery } from './store/store';
import { handleRemove } from './store/actions';
import User from './User';
import CommentList from './CommentList';
import { getHighlightedText } from './highlight';

const Post
  = ({ post, highlightedPart, handleDelete }) => {
    const { id, user, title, body, commentList } = post;

    return (
      <div className="post">
        <dt className="title">
          {`Post ${id}: `}
          {getHighlightedText(title, highlightedPart)}
        </dt>
        <dd className="description">
          <span className="post-body">
            {getHighlightedText(body, highlightedPart)}
          </span>
          <span className="user-info">
            <User userObj={user} />
          </span>
          <button
            type="button"
            className="button button_remove"
            onClick={() => handleDelete(id)}
          >
          Remove this post
          </button>
          <CommentList
            comments={commentList}
          />
        </dd>
      </div>
    );
  };

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    commentList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  }).isRequired,
  highlightedPart: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  highlightedPart: getQuery(state),
});

export default connect(mapStateToProps, { handleDelete: handleRemove })(Post);
