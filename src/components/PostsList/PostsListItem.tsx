import React from 'react';
import classNames from 'classnames';
import { setPost, selectPost } from '../../features/posts/selectedPostSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { Post } from '../../types/Post';

type Props = {
  post: Post;
};

export const PostListItem: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectPost);
  const { id, title } = post;
  const isSelectedPostIdEqualToPostId = id === selectedPost?.id;

  return (
    <tr key={id} data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button',
            'is-link',
            {
              'is-light': id !== selectedPost?.id,
            },
          )}
          onClick={() => {
            dispatch(setPost(isSelectedPostIdEqualToPostId
              ? null
              : post));
          }}
        >
          {isSelectedPostIdEqualToPostId ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
