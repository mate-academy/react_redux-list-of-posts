/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPost/selectedPost';

export const PostsList = () => {
  const { items } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
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
          {items.map(item => (
            <tr key={item.id} data-cy="Post">
              <td data-cy="PostId">{item.id}</td>
              <td data-cy="PostTitle">{item.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': item.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    dispatch(
                      setSelectedPost(
                        item.id === selectedPost?.id ? null : item,
                      ),
                    );
                  }}
                >
                  {item.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
