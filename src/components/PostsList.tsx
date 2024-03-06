/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';
import { setPost } from '../features/selectedPosts/selectedPostsSlice';

// type Props = {
//   selectedPostId?: number;
//   onPostSelected: (post: Post | null) => void;
// };s

export const PostsList = () => {
  const dispatch = useDispatch();
  const { items } = useAppSelector(store => store.posts);
  const { currentPost } = useAppSelector(store => store.selectedPost);
  const selectedPostId = currentPost?.id || 0;

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
          {items.map(post => (
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
                    dispatch(setPost(post.id === selectedPostId ? null : post));
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
