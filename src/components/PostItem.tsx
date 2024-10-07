/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { selectPost } from '../features/selectedPost';
import { Post } from '../types/Post';

interface PostItemProps {
  post: Post;
  isSelected: Post | null;
}

export const PostItem: React.FC<PostItemProps> = ({ post, isSelected }) => {
  const dispatch = useAppDispatch();

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': post.id !== isSelected?.id,
          })}
          onClick={() => {
            dispatch(selectPost(post.id === isSelected?.id ? null : post));
          }}
        >
          {post.id === isSelected?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
