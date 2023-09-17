import classNames from 'classnames';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as selectedPostsActions from '../features/selectedPost/selectedPost';

export const PostsList = () => {
  const { items } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();
  const onPostSelected = (post: Post | null) => {
    dispatch(selectedPostsActions.setSelectedPost(post));
  };

  const selectedPostId = selectedPost?.id;

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
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    onPostSelected(post.id === selectedPostId ? null : post);
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
