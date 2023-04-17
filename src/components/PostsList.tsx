import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  currentPost,
  setSelectedPost,
  allPost,
} from '../features/posts/postsSlice';

export function PostsList() {
  const posts = useAppSelector(allPost);
  const currentSelectedPost = useAppSelector(currentPost);
  const dispatch = useAppDispatch();

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
                      'is-light': post.id !== currentSelectedPost?.id,
                    },
                  )}
                  onClick={() => {
                    // eslint-disable-next-line max-len
                    const postResult = post.id === currentSelectedPost?.id ? null : post;

                    dispatch(setSelectedPost(postResult));
                  }}
                >
                  {post.id === currentSelectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
