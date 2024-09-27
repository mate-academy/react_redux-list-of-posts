import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPost';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={() => {
            dispatch(
              setSelectedPost(post.id === selectedPost?.id ? null : post),
            );
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
