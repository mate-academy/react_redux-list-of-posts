import classNames from 'classnames';
import { Post } from '../../types/Post';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as selPostActions from '../../features/selectedPost/selectedPostSlice';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const selectedPostId = selectedPost ? selectedPost.id : 0;

  const onPostSelected = (postSelected: Post | null) =>
    dispatch(selPostActions.setSelectedPost(postSelected));

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': id !== selectedPostId,
          })}
          onClick={() => {
            onPostSelected(id === selectedPostId ? null : post);
          }}
        >
          {id === selectedPostId ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
