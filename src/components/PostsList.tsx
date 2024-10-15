/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { useAppSelector } from '../app/hooks';
import { PostsItem } from './PostsItem';

export const PostsList: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);

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
            <PostsItem post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
