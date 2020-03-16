import React, { FC } from 'react';
import { Post } from '../Post/Post';
import { FullPostType } from '../../utils/interfaces';
import './PostsList.css';

interface Props {
  posts: FullPostType[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  return (
    <>
      <p>{`Searched posts: ${posts.length}`}</p>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-list__item post">
            <Post post={post} />
          </li>
        ))}
      </ul>
    </>
  );
};
