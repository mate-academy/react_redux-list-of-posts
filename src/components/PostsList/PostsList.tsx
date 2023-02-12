import React from 'react';
import { Post } from '../../types/Post';
import { PostListItem } from './PostsListItem';

type Props = {
  posts: Post[],
};

export const PostsList: React.FC<Props> = ({ posts }) => {
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
            <PostListItem post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
