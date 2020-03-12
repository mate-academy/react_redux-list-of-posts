import React, {
  FC, useMemo, ChangeEvent, useCallback,
} from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import './App.css';


import { PostList } from './components/PostList/PostList';
import {
  getLoading,
  getError,
  getQuery, getPosts,
  getFilteredQuery,

  setQuery as setQueryStore,
  setFilteredQuery as setFilteredQueryStore,
  deletePost as deletePostStore,
  deleteComment as deleteCommentStore,
  loadAllData as loadAllDataStore,
} from './store';


interface Props {
  isLoading: boolean;
  isError: boolean;
  query: string;
  posts: PostWithComments[];
  filterQuery: string;

  setQuery: (value: string) => void;
  setFilterQuery: (value: string) => void;
  deletePost: (value: number) => void;
  deleteComment: (postId: number, commentId: number) => void;
  loadAllData: () => void;
}

const App: FC<Props> = (props) => {
  const {
    isLoading,
    isError,
    query,
    posts,
    filterQuery,

    setQuery,
    setFilterQuery,
    deletePost,
    deleteComment,
    loadAllData,
  } = props;

  function filterPosts(initialPosts: PostWithComments[], filter: string): PostWithComments[] {
    const pattern = new RegExp(filter.trim(), 'gi');

    return initialPosts.filter(post => {
      return pattern.test(post.title) || pattern.test(post.body);
    });
  }

  const visiblePosts = useMemo(
    () => filterPosts(posts, filterQuery),
    [filterQuery, posts],
  );

  const setFilterQueryWithDebonce = useCallback(
    debounce(setFilterQuery, 1000),
    [],
  );

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setFilterQueryWithDebonce(event.target.value);
  }

  if (!posts.length) {
    return (
      <>
        <h1>Redux list of posts</h1>
        <button
          type="button"
          onClick={loadAllData}
          disabled={isLoading}
        >
          Load posts
        </button>
        <p>{isLoading ? 'Loading' : ''}</p>
        <p>{isError ? 'Error occured. Try again later' : ''}</p>
      </>
    );
  }

  return (
    <>
      <h1>Dynamic list of posts</h1>
      <input
        className="search-field"
        value={query}
        type="text"
        placeholder="Enter search query"
        onChange={searchHandler}
      />
      <div className="App">
        <PostList
          postList={visiblePosts}
          onDeletePost={deletePost}
          onDeleteComment={deleteComment}
        />
      </div>
    </>
  );
};

const getMethods = {

  setQuery: setQueryStore,

  setFilterQuery: setFilteredQueryStore,
  deletePost: deletePostStore,
  deleteComment: deleteCommentStore,
  loadAllData: loadAllDataStore,
};

const getData = (state: StoragePosts) => ({
  isLoading: getLoading(state),
  isError: getError(state),
  query: getQuery(state),
  posts: getPosts(state),
  filterQuery: getFilteredQuery(state),
});


export default connect(getData, getMethods)(App);
