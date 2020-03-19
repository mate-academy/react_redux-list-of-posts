import React, { FC, useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import {
  loadPosts as loadPostsStore,
  setFilterQuery as setFilterQueryStore,
} from './store';
import { PostList } from './components/PostList/PostList';
import './App.css';

interface StateProps {
  posts: PostWithComments[] | [];
  isLoading: boolean;
  isStarted: boolean;
  filterQuery: string;
}

interface DispatchProps {
  loadPosts: () => void;
  setFilterQuery: (value: string) => void;
}

type Props = DispatchProps & StateProps;

const App: FC<Props> = ({
  posts,
  isLoading,
  isStarted,
  loadPosts,
  filterQuery,
  setFilterQuery,
}) => {
  const [query, setQuery] = useState('');
  const setFilterQueryWithDebounce = useCallback(debounce(setFilterQuery, 1000), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  const filtered = useMemo<PostWithComments[]>(() => {
    const filterValue = filterQuery.toLowerCase();

    return posts.filter(post => (
      post.title.toLowerCase().includes(filterValue)
      || post.body.toLowerCase().includes(filterValue)
    ));
  }, [filterQuery, posts]);

  return (
    <>
      {isStarted
        ? (
          <button
            type="button"
            className="button button-load"
            disabled={isLoading}
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <div className="app">
            <label htmlFor="search-query" className="label">
              Search
              <div className="control">
                <input
                  type="text"
                  id="search-query"
                  value={query}
                  className="input"
                  placeholder="Title and body search"
                  onChange={(event) => handleChange(event)}
                />
              </div>
            </label>
            <PostList postlist={filterQuery ? filtered : posts} />
          </div>
        )}
    </>
  );
};

const mapStateToProps = (state: State) => ({
  posts: state.posts,
  isLoading: state.isLoading,
  isStarted: state.isStarted,
  filterQuery: state.filterQuery,
});

const mapDispatchToProps = {
  loadPosts: loadPostsStore,
  setFilterQuery: setFilterQueryStore,
};

export default connect<StateProps, DispatchProps, {}, State>(
  mapStateToProps, mapDispatchToProps,
)(App);
