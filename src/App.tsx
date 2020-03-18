import React, {
  FC,
  useCallback,
  useMemo,
} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import {
  PostsWithUserAndComments,
  State,
} from './constants';
import { PostList } from './components/PostList/PostList';
import { loadData } from './store/store';
import {
  setLoading,
  setPosts,
  setQuery,
} from './store/actionCreators';
import { searchCallback } from './utils';
import {
  getError, getLoading, getPosts, getQuery,
} from './store/rootReducer';

interface Props {
  posts: PostsWithUserAndComments[];
  setPosts: (value: PostsWithUserAndComments[]) => void;
  setLoading: (value: boolean) => void;
  isLoading: boolean;
  setQuery: (value: string) => void;
  query: string;
  loadData: () => void;
  error: boolean;
}

const App: FC<Props> = (props) => {
  const {
    query,
    posts,
    error,
    isLoading,
    loadData: loadDataTemplate,
    setQuery: setQueryTemplate,
  } = props;

  const searchWithDelay = useCallback(
    debounce(setQueryTemplate, 1000),
    [],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    searchWithDelay(value.toLowerCase());
  };

  const searchedPosts = useMemo(() => posts
    .filter(searchCallback(query)), [posts, query]);

  return (
    <div className="app">
      {!props.posts.length
        ? (
          <>
            <h1>Dynamic list of posts</h1>
            {error && (<p className="text-danger">Error occured</p>)}
            <button
              type="button"
              className="btn btn-primary"
              onClick={loadDataTemplate}
            >
              {isLoading ? 'Loading.......' : 'Start load'}
            </button>
          </>
        )
        : (
          <>
            <input
              type="text"
              id="input"
              className="form-control"
              placeholder="type search"
              onChange={handleSearch}
            />
            <PostList posts={query ? searchedPosts : posts} />
          </>
        )}
    </div>
  );
};

const mapDispatchToProps = {
  setLoading,
  setPosts,
  setQuery,
  loadData,
};

const mapStateToProps = (state: State) => ({
  posts: getPosts(state),
  isLoading: getLoading(state),
  query: getQuery(state),
  error: getError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
