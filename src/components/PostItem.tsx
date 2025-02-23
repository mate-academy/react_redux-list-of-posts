import classNames from 'classnames';
import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { selectPost } from '../features/selectedPost';
import { Post } from '../types/Post';

interface PostItemProps {
  post: Post;
  isSelected: boolean;
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
            'is-light': !isSelected,
          })}
          onClick={() => {
            dispatch(selectPost(isSelected ? null : post));
          }}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
