/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { PostItem } from './PostItem';

export const PostsList: React.FC = () => {
  const { posts } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem key={post.id} post={post} isSelected={selectedPost} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
