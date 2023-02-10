import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removePost, setPost } from '../features/selectedPostSlice';

type Props = {
  postId: number | undefined
};

export const PostsList: React.FC<Props> = ({ postId }) => {
  const posts = useAppSelector(state => state.posts.items);
  const dispatch = useAppDispatch();

  if (!posts.length) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

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
                      'is-light': post.id !== postId,
                    },
                  )}
                  onClick={() => dispatch(post.id === postId
                    ? removePost()
                    : setPost(post))}
                >
                  {post.id === postId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
