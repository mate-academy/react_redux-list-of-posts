/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { Post } from '../types/Post';
import {
  clearSelectedPost,
  setSelectedPost,
} from '../features/posts/postsSlice';

interface PostsListProps {
  selectedPostId: number | undefined;
  posts: Post[];
}

export const PostsList: React.FC<PostsListProps> = ({
  selectedPostId,
  posts,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (post: Post) => {
    dispatch(
      post.id === selectedPostId ? clearSelectedPost() : setSelectedPost(post),
    );
  };

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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => handleClick(post)}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
