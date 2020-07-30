import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../store';
import { setPosts } from '../store/postsReducer';
import { User, Post, Comment } from './Interfaces';
import { CommentList } from './CommentList';
import { UserItem } from './UserItem';

interface Props {
  comments: Comment[];
  user: User;
  post: Post;
}

export const PostItem: React.FC<Props> = ({ comments, user, post }) => {
  const dispatch = useDispatch();
  const preparedPosts = useSelector(getPosts);

  const handleClick = (id: number) => {
    const newPosts = {
      posts: preparedPosts.posts
        .filter((item: Post) => item.id !== id),
      users: [...preparedPosts.users],
      comments: [...preparedPosts.comments],
    };

    dispatch(setPosts(newPosts));
  };

  return (
    <li className="post">
      <h1>
        {post.title}
      </h1>
      <button
        type="button"
        onClick={() => handleClick(post.id)}
      >
        Delete
      </button>
      <p>
        {post.body}
      </p>
      <UserItem user={user} />
      <CommentList comments={comments} />
    </li>
  );
};
