import React from 'react';
import PostItem from './PostItem';

type Props = {
  posts: PostProps[];
};

const PostList: React.FC<Props> = ({ posts }) => (
  <>
    {posts.map((post: PostProps) => (
      <PostItem post={post} key={post.id} />
    ))}
  </>
);

export default PostList;
