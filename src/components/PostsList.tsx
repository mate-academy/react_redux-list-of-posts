import React, { useCallback, useMemo, useState } from 'react';
import { Search } from './Search';
import debounce from '../helpers/debounce';
import { Post } from './Post';

export const PostsList = ({ posts }: PostsListProps) => {
  const [filteredQuery, setFilteredQuery] = useState('');
  const [query, setQuery] = useState('');

  const visiblePosts = useMemo(() => {
    return posts.filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return (title + body).includes(filteredQuery.toLowerCase());
    });
  }, [posts, filteredQuery]);

  const setFilteredQueryWithDebounce = useCallback(
    debounce(setFilteredQuery, 1000),
    [],
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    setFilteredQueryWithDebounce(e.target.value);
  }, [setQuery, setFilteredQueryWithDebounce]);

  return (
    <>
      <Search handleSearch={handleSearch} query={query} />
      <article className="app__post-list">
        {visiblePosts.map((post) => <Post key={post.id} {...post} />)}
      </article>
    </>
  );
};
