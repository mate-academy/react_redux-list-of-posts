/* eslint-disable */

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { actions as postsActions } from '../features/posts/postsSlice';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { posts, post } = useAppSelector(state => state.posts);

  const postId = post?.id || 0;

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
                  onClick={() => {
                    dispatch(postsActions.setPost(
                      post.id === postId ? null : post,
                    ));
                  }}
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
