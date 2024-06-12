import { FC } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import { useAppSelector } from '../app/hooks';

type TProps = {
  post: Post;
  handleSelectPost: (post: Post) => void;
};

export const PostItem: FC<TProps> = ({ post, handleSelectPost }) => {
  const { id, title } = post;
  const { selectedPost } = useAppSelector(state => state.posts);

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button', 'is-link', {
            'is-light': id !== selectedPost?.id,
          })}
          onClick={() => handleSelectPost(post)}
        >
          {id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
