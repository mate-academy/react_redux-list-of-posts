/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { useAppSelector } from '../app/hooks';

import { PostItem } from './PostItem';
import { selectPosts } from '../features/postsSlice';
import { selectAuthor } from '../features/authorSlice';

export const PostsList: React.FC = () => {
  const { items: posts } = useAppSelector(selectPosts);
  const author = useAppSelector(selectAuthor);

  if (!author || !posts.length) {
    return null;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
