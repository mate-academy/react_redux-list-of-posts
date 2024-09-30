/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Post } from '../types/Post';
import { useAppSelector } from '../app/hooks';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const selectedPostId = selectedPost?.id;

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
          {posts.map(post => {
            const isSelected = post.id === selectedPostId;

            return (
              <PostItem key={post.id} post={post} isSelected={isSelected} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
