import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import './App.css';
import { postsLoaded as postLoadedAction } from './store/postsLoadedReducer';
import { finishLoading, startLoading } from './store/loadingReducer';
import { loadPreparedPosts } from './store/postsReducer';
import { setSearchTermValue } from './store/searchInputReducer';
import { getPostsWithComments, getIsloading, getisLoaded } from './store/index';

const PostsList = ({
  isLoaded,
  isLoading,
  preparePosts,
  setSearchTerm,
  startLoad,
  postsLoaded,
  finishLoad,
  preparedPosts,
}) => {
  const getPreparedPosts = async() => {
    startLoad();
    await preparePosts();
    finishLoad();
    postsLoaded();
  };

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };
  const inputChangeHandler = (value) => {
    setSearchTerm(value.trim().toLowerCase());
  };
  const debouncedInputChangeHandler = debounce(inputChangeHandler, 1000);

  return (
    <div className="App">
      {
        !isLoaded ? (
          <button
            type="button"
            className="button button--init"
            onClick={() => {
              getPreparedPosts();
            }}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <>
            <input
              type="text"
              className="post-list__searchInput"
              placeholder="Search"
              onChange={e => debouncedInputChangeHandler(e.target.value)}
            />
            <span className="post-list__post-count">
              {`${preparedPosts.length}
                  ${preparedPosts.length === 1 ? 'post' : 'posts'} found`}
            </span>
            <article className="post-list">

              {preparedPosts.map(post => (
                <section
                  className="post-list__post"
                  key={post.id}
                >
                  <Post postElems={post} />
                </section>
              ))}
            </article>
          </>
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: getIsloading(state),
  isLoaded: getisLoaded(state),
  preparedPosts: getPostsWithComments(state),
});
const mapDispatchToProps = dispatch => ({
  preparePosts: () => dispatch(loadPreparedPosts()),
  setSearchTerm: value => dispatch(setSearchTermValue(value)),
  finishLoad: () => dispatch(finishLoading()),
  startLoad: () => dispatch(startLoading()),
  postsLoaded: () => dispatch(postLoadedAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

PostsList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  preparePosts: PropTypes.func.isRequired,
  startLoad: PropTypes.func.isRequired,
  finishLoad: PropTypes.func.isRequired,
  postsLoaded: PropTypes.func.isRequired,
  preparedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
