import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPosts } from '../actions';
import Post from './post';

const PostList = ({ isLoaded, loading, loadingData, posts }) => {
  const loadData = async() => {
    await loadingData();
  };

  return (
    <div>
      { isLoaded
        ? (
          <section className="main">
            {posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                userName={post.user.name}
                email={post.user.email}
                address={`${post.user.address.city}, 
                ${post.user.address.street}`}
                comments={post.comments}
              />
            ))}
          </section>
        ) : (
          <div>
            { loading ? (
              <>
                <div className="loadingio-spinner-double-ring-9q7pnd89ma7">
                  <div className="ldio-825x8t7zp7o">
                    <div />
                    <div />
                    <div>
                      <div />
                    </div>
                    <div>
                      <div />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                className="ui positive basic button"
                type="button"
                onClick={loadData}
              >
                Click me
              </button>
            )}
          </div>
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  isLoaded: state.isLoaded,
  loading: state.loading,
});

const mapDispatchToProps = {
  loadingData: loadPosts,
};

PostList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingData: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])),
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
