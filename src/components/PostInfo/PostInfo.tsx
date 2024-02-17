import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedPost } from '../../features/posts/selectedPost';
import { Post } from '../../types/Post';

interface Props {
  post: Post,
}

export const PostInfo:React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);
  const isSelected = selectedPost?.id === post.id;

  const handleNewPostSelected = () => {
    dispatch(setSelectedPost(isSelected ? null : post));
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleNewPostSelected}
          type="button"
          data-cy="PostButton"
          className={`button ${isSelected ? 'is-link' : 'is-light'}`}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
