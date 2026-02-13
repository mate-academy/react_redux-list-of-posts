import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { setSelectedPost } from '../features/selectedPostSlice';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const handleSelectPost = (id: number, currentPost: Post) => {
    dispatch(setSelectedPost(id === selectedPost?.id ? null : currentPost));
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
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={() => {
            handleSelectPost(post.id, post);
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
