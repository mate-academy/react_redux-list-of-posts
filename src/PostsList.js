import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import './App.css';
import { handleChange } from './store/searchInputReducer';
import { finishShowing } from './store/showingReducer';
import { finishLoading, startLoading } from './store/loadingReducer';
import { loadPreparedPosts } from './store/postsReducer';
import { getPostsWithComments, getIsloading, getisShown } from './store/index';

const PostsList = ({
  isShown,
  isLoading,
  preparePosts,
  inputChangeHandler,
  startLoad,
  finishShow,
  finishLoad,
  preparedPosts,
}) => {
  const getPreparedPosts = async() => {
    startLoad();
    await preparePosts();
    finishLoad();
    finishShow();
  };
  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };

  const debouncedInputChangeHandler = debounce(inputChangeHandler, 1000);

  return (
    <div className="App">
      {
        isShown ? (
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
  isShown: getisShown(state),
  preparedPosts: getPostsWithComments(state),
});
const mapDispatchToProps = dispatch => ({
  preparePosts: () => dispatch(loadPreparedPosts()),
  inputChangeHandler: value => dispatch(handleChange(value)),
  finishLoad: () => dispatch(finishLoading()),
  startLoad: () => dispatch(startLoading()),
  finishShow: () => dispatch(finishShowing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

PostsList.propTypes = {
  isShown: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  inputChangeHandler: PropTypes.func.isRequired,
  preparePosts: PropTypes.func.isRequired,
  startLoad: PropTypes.func.isRequired,
  finishLoad: PropTypes.func.isRequired,
  finishShow: PropTypes.func.isRequired,
  preparedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
