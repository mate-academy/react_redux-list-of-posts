/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addSelectedPost } from '../features/posts/postsSlice';

export const PostsList = () => {
  const posts = useAppSelector(state => state.posts.items);
  const selectedPostId = useAppSelector(
    state => state.posts.selectedPost?.id || 0,
  );
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
          {posts?.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => {
                    dispatch(
                      addSelectedPost(post.id === selectedPostId ? null : post),
                    );
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
