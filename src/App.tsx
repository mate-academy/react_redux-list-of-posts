import React, { FC, ChangeEvent, useMemo } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { PostsList } from './components/PostsList/PostsList';
import { RootState, FullPostType } from './utils/interfaces';
import { fullPosts, getFilteredPosts } from './utils/dataMappers';
import { loadData as loadAllData, setQuery as changeSetQuery } from './store/actionCreators';

interface Props {
  isLoading: boolean;
  isError: boolean;
  isLoaded: boolean;
  posts: FullPostType[];
  query: string;
  loadData: () => void;
  setQuery: (query: string) => void;
}

const AppTemplate: FC<Props> = ({
  isLoading,
  isLoaded,
  isError,
  loadData,
  setQuery,
  posts,
  query,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const visiblePosts = useMemo(() => getFilteredPosts(query, posts), [query, posts]);

  if (isError) {
    return <p className="error-message">Error occurred! Please, try again!</p>;
  }

  return (
    <>
      {!isLoaded
        ? (
          <button
            className="start-button"
            type="button"
            onClick={loadData}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start load posts'}
          </button>
        )
        : (
          <div className="app">
            <h1>Dynamic list of posts</h1>
            <label
              htmlFor="search"
              className="app__label"
            >
              {'Search post:  '}
              <input
                className="app__input"
                id="search"
                type="text"
                value={query}
                onChange={handleChange}
              />
            </label>
            <PostsList posts={visiblePosts} />
          </div>
        )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.isLoading,
    isError: state.isError,
    isLoaded: state.isLoaded,
    query: state.query,
    posts: (state.users.length && state.comments.length)
      ? fullPosts(state.posts, state.users, state.comments) : [],
  };
};

const mapDispatchToProps = {
  loadData: loadAllData,
  setQuery: changeSetQuery,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppTemplate);
