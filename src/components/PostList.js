import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ data }) => (
  <>
    <input
      className="search"
      type="text"
      placeholder="Search"
    />
    {data
      .map(currentPost => (
        <Post
          post={currentPost}
          key={currentPost.id}
        />
      ))}
  </>
);

PostList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

const mapStateToProps = () => ({ data }) => ({ data });

export default connect(mapStateToProps)(PostList);
