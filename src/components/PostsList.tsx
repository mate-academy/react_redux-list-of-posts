import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { add, remove } from '../features/selectPost';
import { takeSelectPost, Posts } from '../app/store';

export const PostsList = () => {
  const { posts } = useAppSelector(Posts);
  const dispatch = useAppDispatch();
  const { selectPost } = useAppSelector(takeSelectPost);

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
                      'is-light': post !== selectPost,
                    },
                  )}
                  onClick={() => {
                    dispatch(post !== selectPost ? add(post) : remove());
                  }}
                >
                  {post !== selectPost ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
