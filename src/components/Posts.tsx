import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const Posts = (() => {
  const dispatch = useAppDispatch();
  const selectedPostId = useAppSelector((state) => state
    .selectedPost.selectedPost?.id);

  const { items: posts } = useAppSelector(
    (state) => state.posts,
  );

  return (
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
                dispatch({
                  type: 'selectedPost/setSelectedPost',
                  payload: post.id === selectedPostId ? null : post,
                });
              }}
            >
              {post.id === selectedPostId ? 'Close' : 'Open'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
});
