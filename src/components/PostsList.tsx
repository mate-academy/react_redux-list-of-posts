import React from 'react';
import { useAppSelector } from '../app/hooks';
import { PostInfo } from './PostInfo';

export const PostsList: React.FC = () => {
  const { items: posts } = useAppSelector(state => state.posts);

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
          {posts.map(post => <PostInfo key={post.id} post={post} />)}
        </tbody>
      </table>
    </div>
  );
};
