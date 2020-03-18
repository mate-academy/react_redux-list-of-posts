import React, { FC } from 'react';
import { PostsWithUserAndComments } from '../../constants';
import { Post } from '../Post/Post';

interface Props {
  posts: PostsWithUserAndComments[];
}

export const PostList: FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div className="list">
      {
        posts.map((post) => <Post key={post.id} post={post} />)
      }
    </div>
  );
};
