import React from 'react';
import PropTypes from 'prop-types';
import PostContainer from '../Post/PostContainer';

const PostList = ({
  posts, loadDataPosts, isDataLoaded, isLoading,
}) => {
  const loadPosts = () => loadDataPosts();

  return (
    <>
      <button
        className="button"
        type="button"
        onClick={loadPosts}
        disabled={isLoading}
        style={isDataLoaded ? { display: 'none' } : { display: 'initial' }}
      >
        {isLoading ? 'loading' : 'Load Posts'}
      </button>
      {posts.map(post => <PostContainer post={post} key={post.id} />)}
    </>
  );
};

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

PostList.propTypes = {
  posts: PropTypes.arrayOf(shape).isRequired,
  loadDataPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

export default PostList;
