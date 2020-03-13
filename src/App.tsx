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
  searchCallback,
} from './utils/api';
import {
  PostsWithUserAndComments,
  State,
} from './constants/types';
import { PostList } from './components/PostList/PostList';
import {
  getLoading,
  getPosts,
  setLoading,
  setPosts,
  getQuery,
  setQuery,
  loadData,
  getError,
} from './store';

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
  const handleStart = async () => {
    props.loadData();
  };

  const searchWithDelay = useCallback(
    debounce(props.setQuery, 1000),
    [],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    searchWithDelay(value.toLowerCase());
  };

  const searchedPosts
    = useMemo(() => props.posts
      .filter(searchCallback(props.query)), [props.posts, props.query]);

  return (
    <div className="app">
      {!props.posts.length
        ? (
          <>
            <h1>Dynamic list of posts</h1>
            {props.error && (<p className="text-danger">Error occured</p>)}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleStart}
            >
              {props.isLoading ? 'Loading.......' : 'Start load'}
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
            <PostList posts={props.query ? searchedPosts : props.posts} />
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
