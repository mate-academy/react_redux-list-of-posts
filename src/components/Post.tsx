import classNames from 'classnames';
import { Post as PostType } from '../types/Post';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPost';

type Props = {
  post: PostType;
};

export const Post: React.FC<Props> = ({ post }) => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const handleSelectingPost = (postId: PostType | null) => {
    dispatch(setSelectedPost(postId));
  };

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
            handleSelectingPost(post.id === selectedPost?.id ? null : post);
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
