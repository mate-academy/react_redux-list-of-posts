// PostItem.tsx
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as selectedPostActions } from '../features/selectedPostSlice';
import { Post } from '../types/Post';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const isSelectedPost = post.id === selectedPost?.id;

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isSelectedPost,
          })}
          onClick={() => {
            dispatch(selectedPostActions.set(isSelectedPost ? null : post));
          }}
        >
          {isSelectedPost ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
