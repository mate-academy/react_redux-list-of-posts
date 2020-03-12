import React, {
  FC, useMemo, ChangeEvent, useCallback,
} from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import './App.css';

import { getCommentsFromAPI, getUsersFromAPI, getPostsFromAPI } from './util';
import { PostList } from './components/PostList/PostList';
import {
  getLoading,
  setLoading,
  getError,
  setError,
  setQuery as setQueryStore,
  getQuery, getPosts,
  setPosts as setPostsStore,
  getFilteredQuery,
  setFilteredQuery as setFilteredQueryStore,
  deletePost,
  deleteComment,
} from './store';


interface Props {
  isLoading: boolean;
  isError: boolean;
  query: string;
  posts: PostWithComments[];
  filterQuery: string;

  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setQuery: (value: string) => void;
  setPosts: (value: PostWithComments[]) => void;
  setFilterQuery: (value: string) => void;
  deletePost: (value: number) => void;
  deleteComment: (postId: number, commentId: number) => void;
}

const App: FC<Props> = (props) => {
  function filterPosts(initialPosts: PostWithComments[], filter: string): PostWithComments[] {
    const pattern = new RegExp(filter.trim(), 'gi');

    return initialPosts.filter(post => {
      return pattern.test(post.title) || pattern.test(post.body);
    });
  }

  const visiblePosts = useMemo(
    () => filterPosts(props.posts, props.filterQuery),
    [props.filterQuery, props.posts],
  );

  const setFilterQueryWithDebonce = useCallback(
    debounce(props.setFilterQuery, 1000),
    [],
  );

  function loadClickHandler() {
    props.setIsError(false);
    props.setIsLoading(true);
    Promise.all([
      getUsersFromAPI(),
      getPostsFromAPI(),
      getCommentsFromAPI(),
    ]).then(([usersFromApi, postsFromApi, commentsFromApi]) => {
      props.setIsLoading(false);
      const newPosts = postsFromApi.map(post => {
        return {
          ...post,
          user: (usersFromApi.find(item => item.id === post.userId) as User),
          comments: commentsFromApi.filter(item => item.postId === post.id),
        };
      });

      props.setPosts(newPosts);
    }).catch(() => {
      props.setIsError(true);
      props.setIsLoading(false);
    });
  }

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    props.setQuery(event.target.value);
    setFilterQueryWithDebonce(event.target.value);
  }

  if (!props.posts.length) {
    return (
      <>
        <h1>Redux list of posts</h1>
        <button
          type="button"
          onClick={loadClickHandler}
          disabled={props.isLoading}
        >
          Load posts
        </button>
        <p>{props.isLoading ? 'Loading' : ''}</p>
        <p>{props.isError ? 'Error occured. Try again later' : ''}</p>
      </>
    );
  }

  return (
    <>
      <h1>Dynamic list of posts</h1>
      <input
        className="search-field"
        value={props.query}
        type="text"
        placeholder="Enter search query"
        onChange={searchHandler}
      />
      <div className="App">
        <PostList
          postList={visiblePosts}
          onDeletePost={props.deletePost}
          onDeleteComment={props.deleteComment}
        />
      </div>
    </>
  );
};

const getMethods = {
  setIsLoading: setLoading,
  setIsError: setError,
  setQuery: setQueryStore,
  setPosts: setPostsStore,
  setFilterQuery: setFilteredQueryStore,
  deletePost,
  deleteComment,
};

const getData = (state: StoragePosts) => ({
  isLoading: getLoading(state),
  isError: getError(state),
  query: getQuery(state),
  posts: getPosts(state),
  filterQuery: getFilteredQuery(state),
});


export default connect(getData, getMethods)(App);
