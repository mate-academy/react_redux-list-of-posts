import React from 'react';
import { useSelector } from 'react-redux';
import { getPosts, getQuery } from '../store';
import {
  User, Post, Comment, Posts,
} from './Interfaces';
import { PostItem } from './PostItem';

export const PostsList: React.FC = () => {
  const preparedPosts: Posts = useSelector(getPosts);
  const query: string = useSelector(getQuery);
  let filteredPosts: Posts;

  if (query !== '') {
    const pattern = new RegExp(query, 'ig');

    filteredPosts = {
      posts: preparedPosts.posts
        .filter((post: Post) => pattern.test(post.title) || pattern.test(post.body)),
      users: [...preparedPosts.users],
      comments: [...preparedPosts.comments],
    };
  } else {
    filteredPosts = { ...preparedPosts };
  }

  return (
    <ul className="post-list">
      {
        filteredPosts.posts.map((post: Post) => {
          const userCopy = preparedPosts.users
            .find((user: User) => user.id === post.userId) as User;

          const filteredComments = preparedPosts.comments
            .filter((comment: Comment) => comment.postId === post.id);

          return (
            <PostItem
              key={post.id}
              comments={filteredComments}
              user={userCopy}
              post={post}
            />
          );
        })
      }
    </ul>
  );
};
