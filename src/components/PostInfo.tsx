import { FC } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import * as selectedPostActions
  from '../features/selectedPost/selectedPostSlice';

type Props = {
  post: Post;
};

export const PostInfo: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    post: selectedPost,
  } = useAppSelector(state => state.selectedPost);

  const handleSelectPost = (currentPost: Post | null) => {
    if (currentPost) {
      dispatch(selectedPostActions.select(currentPost));
    } else {
      dispatch(selectedPostActions.clear());
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={() => {
            const currentPost = post.id === selectedPost?.id
              ? null
              : post;

            handleSelectPost(currentPost);
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
