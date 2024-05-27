import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as actionsPosts from '../features/posts';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { selectedPost } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const handleClickPost = (postItem: Post) => {
    if (postItem.id !== selectedPost?.id) {
      dispatch(actionsPosts.setPost(postItem));
    } else {
      dispatch(actionsPosts.deletePost());
    }
  };

  const { id, title } = post;

  const isSelected = id === selectedPost?.id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isSelected,
          })}
          onClick={() => handleClickPost(post)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
