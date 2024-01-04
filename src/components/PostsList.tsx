/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Post } from '../types/Post';
import { selectPost } from '../features/postsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const {
    items: posts,
    selectedPost,
  } = useAppSelector(state => state.posts);

  const selectedPostId = selectedPost?.id || 0;

  const handlePostSelection = (post: Post) => {
    return dispatch(selectPost(post.id === selectedPostId ? null : post));
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
                  onClick={() => handlePostSelection(post)}
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
