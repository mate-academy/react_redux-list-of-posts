import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clear,
  set as setSelectedPost,
} from '../features/selectedPost/selectedPostSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userPosts, selectedPost } = useAppSelector(state => state);
  const { posts } = userPosts;

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
          {posts.map(post => {
            const isSelected = post.id === selectedPost.data?.id;

            return (
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
                        'is-light': isSelected,
                      },
                    )}
                    onClick={() => {
                      if (isSelected) {
                        dispatch(clear());

                        return;
                      }

                      dispatch(setSelectedPost(post));
                    }}
                  >
                    {post.id === selectedPost.data?.id ? 'Close' : 'Open'}
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
