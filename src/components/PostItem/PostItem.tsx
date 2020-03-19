import React, { FC } from 'react';
import { CommentList } from '../CommentList/CommentList';
import 'bulma';

import './PostItem.css';

interface PostsItemProps {
  post: PostsWithUser;
}

export const PostItem: FC<PostsItemProps> = ({ post }) => {

  return (
    <div className="box post-item">
      <div className="post-item-header">
        <p className="post-item-header-item">{post.user.name}</p>
        <p className="post-item-header-item">{post.user.username}</p>
      </div>

      <div className="post-item-description notification">
        <p className="post-item-header-title">{post.title}</p>
        <p className="post-item-header-description">{post.body}</p>
      </div>

      <CommentList comments={post.comments} />
    </div>
  );
};
