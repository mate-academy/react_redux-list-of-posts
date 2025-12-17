// src/components/PostsList.tsx
import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { useAppDispatch } from '../app/hooks';
import { setSelectedPost } from '../features/SelectedPostSlice';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({ posts, selectedPost }) => {
  const dispatch = useAppDispatch();

  const handleSelect = (post: Post) => {
    dispatch(setSelectedPost(post.id === selectedPost?.id ? null : post));
  };

  return (
    <table className="table is-fullwidth" data-cy="PostsList">
      <tbody>
        {posts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>
            <td data-cy="PostTitle">{post.title}</td>
            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button', 'is-link', {
                  'is-light': post.id !== selectedPost?.id,
                })}
                onClick={() => handleSelect(post)}
              >
                {post.id === selectedPost?.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
