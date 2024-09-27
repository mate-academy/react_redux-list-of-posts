import {
  clearSelect,
  selectPost,
  selectSelectedPost,
} from '../features/selectedPostSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};
export const PostItem: React.FC<Props> = ({ post }) => {
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  const handlePostSelected = (currentPost: Post) => {
    dispatch(
      currentPost.id === selectedPost?.id
        ? clearSelect()
        : selectPost(currentPost),
    );
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
          onClick={() => handlePostSelected(post)}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
