import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import {
  selectPosts,
  selectSelectedPostId,
  setSelectedPostId,
} from '../features/postsSlice';

export const PostsList = () => {
  const dispatch = useAppDispatch();

  const posts = useSelector(selectPosts);
  const selectedPostId = useSelector(selectSelectedPostId);

  const handleSelectPost = (value: number | null) => {
    dispatch(setSelectedPostId(value));
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    handleSelectPost(post.id === selectedPostId
                      ? null
                      : post.id);
                  }}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
