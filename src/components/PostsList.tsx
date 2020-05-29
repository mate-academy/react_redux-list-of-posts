import React, { useCallback, useMemo, useState } from 'react';
import { Search } from './Search';
import debounce from '../helpers/debounce';
import { setQuery } from '../redux/store/query';
import { useDispatch } from 'react-redux';
import { Post } from './Post';

export const PostsList = ({ posts }: PostsListProps) => {
  const [filteredQuery, setFilteredQuery] = useState('');
  const dispatch = useDispatch();

  const visiblePosts = useMemo(() => {
    const filteredPosts = [...posts].filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return (title + body).includes(filteredQuery.toLowerCase());
    });

    return filteredPosts;
  }, [posts, filteredQuery]);

  const setFilteredQueryWithDebounce = useCallback(
    debounce(setFilteredQuery, 1000),
    [],
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuery(e.target.value));
    setFilteredQueryWithDebounce(e.target.value);
  }, [dispatch, setFilteredQueryWithDebounce]);


  return (
    <>
      <Search handleSearch={handleSearch} />
      <article className="app__post-list">
        {visiblePosts.map((post) => <Post key={post.id} {...post} />)}
      </article>
    </>
  );
};
