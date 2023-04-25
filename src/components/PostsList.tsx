/* eslint-disable @typescript-eslint/no-unused-expressions */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addPost, removePost } from '../features/selectedPost';

// type Props = {
//   posts: Post[],
//   selectedPostId?: number,
//   onPostSelected: (post: Post | null) => void,
// };

export const PostsList: React.FC = () => {
  const { items } = useAppSelector(state => state.posts);
  const { item } = useAppSelector(state => state.selectedPost);

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
                      'is-light': post.id !== item?.id,
                    },
                  )}
                  onClick={() => {
                    post.id === item?.id
                      ? dispatch(removePost())
                      : dispatch(addPost(post));
                  }}
                >
                  {post.id === item?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
