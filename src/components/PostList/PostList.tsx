import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PostItem } from './PostItem';
import { getPosts } from '../../store';

export const PostList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const posts: Post[] = useSelector(getPosts);

  const searchedPosts = useMemo(
    () => posts.filter((post: Post) => (`${post.title} ${post.body}`)
      .replace(/\s*/g, ' ')
      .includes(query.replace(/\s*/g, ' '))),
    [query, posts],
  );

  return (
    <>
      {searchedPosts.map((post: Post) => (
        <PostItem {...post} key={post.id} />
      ))}
    </>
  );
};
