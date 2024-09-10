import React from 'react';

import { useAppSelector } from '../app/hooks';

import { PostDetailsContent } from './PostDetailsContent';

export const PostDetails: React.FC = () => {
  const post = useAppSelector(state => state.selectedPost);

  if (!post) {
    return <></>;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        <PostDetailsContent />
      </div>
    </div>
  );
};
