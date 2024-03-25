/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as selectedPostActions } from '../features/selectedPostSlice';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

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
          {items.map(post => {
            const isSelectedPost = post.id === selectedPost?.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': !isSelectedPost,
                    })}
                    onClick={() => {
                      dispatch(
                        selectedPostActions.set(isSelectedPost ? null : post),
                      );
                    }}
                  >
                    {isSelectedPost ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
