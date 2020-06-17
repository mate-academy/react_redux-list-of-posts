import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { StartButton } from './components/StartButton/StartButton';
import { PostList } from './components/PostList/PostList';
import { PostFilter, filterPosts } from './components/PostFilter/PostFilter';

import { getErrorMessage, getPosts, getFilterQuery } from './store';

const App = () => {
  const errorMessage = useSelector(getErrorMessage);
  const posts = useSelector(getPosts);
  const filterQuery = useSelector(getFilterQuery);

  const visiblePosts = useMemo(() => filterPosts(filterQuery, posts), [
    filterQuery,
    posts,
  ]);

  return (
    <section className="post-list">
      <h1 className="post-list__title">Dynamic list of posts</h1>

      {posts.length === 0 ? (
        <>
          <StartButton />
          {errorMessage && (<p>{errorMessage}</p>)}
        </>
      ) : (
        <>
          <PostFilter />
          <PostList posts={visiblePosts} />
        </>
      )}
    </section>
  );
};

export default App;
