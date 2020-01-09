import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { getIsLoading, getIsInitialized, getHasError } from './store/store';
import { updateQuery, loadList } from './store/actions';
import PostList from './PostList';
import './App.scss';

const App
  = ({ isLoading, hasError, setQueryValue, isInitialized, load }) => {
    const [visibleQuery, setVisibleQuery] = useState('');

    const planQueryUpdate = useCallback(
      debounce(setQueryValue, 500),
      []
    );
    const handleQueryUpdate = (e) => {
      const input = e.target.value.replace(/^\s+/, '');

      planQueryUpdate(input.toLowerCase());
      setVisibleQuery(input);
    };

    if (hasError) {
      return <p className="error-message">Oops, something went wrong!</p>;
    }

    return (
      <div className="App">
        {!isInitialized ? (
          <>
            <button
              className="button"
              type="button"
              onClick={load}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          </>
        ) : (
          <>
            <div className="top">
              <h1 className="table__heading">React-Redux list of posts</h1>
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={handleQueryUpdate}
                value={visibleQuery}
              />
            </div>
            <PostList />
          </>
        )}
      </div>
    );
  };

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  hasError: getHasError(state),
  isInitialized: getIsInitialized(state),
});

const mapDispatchToProps = {
  load: loadList,
  setQueryValue: updateQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
