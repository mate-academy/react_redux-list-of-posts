import React from 'react';
import { Post } from '../types/Post';
import { Posts } from './Posts';

type Props = {
  posts: Post[],
};

export const PostsList: React.FC<Props> = () => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th aria-hidden="true"> </th>
          </tr>
        </thead>

        <Posts />
      </table>
    </div>
  );
};
