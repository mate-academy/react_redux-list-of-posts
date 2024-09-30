import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { useAppDispatch } from '../app/hooks';
import { selectedPostSlice } from '../features/selectedPost';

type Props = {
  post: Post;
  isSelected: boolean;
};

export const PostItem: React.FC<Props> = ({ post, isSelected }) => {
  const dispatch = useAppDispatch();

  const handleSelectPost = () => {
    dispatch(selectedPostSlice.actions.add(isSelected ? null : post));
  };

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
          onClick={handleSelectPost}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
