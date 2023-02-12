import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { set as setSelectedPost } from '../features/selectedPostSlice';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const posts = useAppSelector(state => state.postsState.items);
  const selectedPost = useAppSelector(state => state.selectedPostState.item);
  const dispatch = useAppDispatch();

  const handleClick = (value: Post | null) => {
    dispatch(setSelectedPost(value));
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
          {posts.map(post => {
            const isOpenedPost = post.id === selectedPost?.id;

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
                        'is-light': !isOpenedPost,
                      },
                    )}
                    onClick={() => handleClick(isOpenedPost ? null : post)}
                  >
                    {isOpenedPost ? 'Close' : 'Open'}
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
