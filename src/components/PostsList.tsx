import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { set as setSelectedPost } from '../features/selectedPost';
import { Post } from '../types/Post';

const getButtonClass = (postId: number, selectedPostId: number | null) => {
  return classNames('button', 'is-link', {
    'is-light': postId !== selectedPostId,
  });
};

export const PostsList = () => {
  const { items } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const onPostClick = (post: Post) => {
    if (selectedPost?.id !== post.id) {
      dispatch(setSelectedPost(post));
    } else {
      dispatch(setSelectedPost(null));
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {items.map(({ id, title }) => (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>
              <td data-cy="PostTitle">{title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={getButtonClass(id, selectedPost?.id || 0)}
                  onClick={() => onPostClick({
                    id,
                    title,
                    userId: 0,
                    body: '',
                  })}
                >
                  {id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
