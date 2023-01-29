import { FC } from 'react';
import { Post } from '../../types/Post';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFormStatus, setSidebarStatus } from '../../app/slices/uiSlice';
import { selectPost } from '../../app/slices/postSlice';

type Props = {
  post: Post;
};
export const PostItem: FC<Props> = ({ post }) => {
  const { isSidebarOpen } = useAppSelector(state => state.ui);
  const { selectedPost } = useAppSelector(state => state.post);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setSidebarStatus(false));
    dispatch(setFormStatus(false));
  };

  const onOpen = () => {
    if (isSidebarOpen) {
      dispatch(selectPost(post));
    } else {
      dispatch(selectPost(post));
      dispatch(setSidebarStatus(true));
    }

    dispatch(setFormStatus(false));
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        {isSidebarOpen && selectedPost?.id === post.id ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={onClose}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={onOpen}
          >
            Open
          </button>
        )}
      </td>
    </tr>
  );
};
