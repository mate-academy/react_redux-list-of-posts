import classNames from 'classnames';
import { FC } from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as selectedPostActions } from '../features/selectedPost';

type Props = {
  post: Post;
};

export const PostItem: FC<Props> = ({ post }) => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const handlePost = (currentPost: Post) => {
    if (selectedPost?.id === currentPost.id) {
      dispatch(selectedPostActions.delete());
    } else {
      dispatch(selectedPostActions.set(currentPost));
    }
  };

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button',
            'is-link',
            {
              'is-light': post.id !== selectedPost?.id,
            },
          )}
          onClick={() => handlePost(post)}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
