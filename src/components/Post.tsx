import classNames from 'classnames';
import { Post } from '../types/Post';
import { setSelectedPost } from '../features/selectedPost/selectedPost';
import { fetchComments } from '../features/comments/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedPost } from '../features/selectors';

type Props = {
  post: Post;
};

export const PostComponent: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectSelectedPost);

  const setPostSelected = (postItem: Post) => {
    if (postItem.id !== selectedPost?.id) {
      dispatch(setSelectedPost(postItem));
      dispatch(fetchComments(postItem.id));
    } else {
      dispatch(setSelectedPost(null));
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
          className={classNames('button', 'is-link', {
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={() => {
            setPostSelected(post);
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
