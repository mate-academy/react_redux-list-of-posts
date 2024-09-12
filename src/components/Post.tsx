import React from 'react';
import classNames from 'classnames';
import { Post as PostType } from '../types/Post';

type Props = {
  post: PostType;
  isSelected: boolean;
  onPostClick: (post: PostType | null) => void;
};

export const Post: React.FC<Props> = ({ post, isSelected, onPostClick }) => {
  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isSelected,
          })}
          onClick={() => {
            onPostClick(isSelected ? null : post);
          }}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
