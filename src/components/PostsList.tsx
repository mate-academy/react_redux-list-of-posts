import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { set as setSelectedPost } from '../features/selectedPostSlice';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const handleSelectPost = (post: Post) => {
    if (post.id === selectedPost?.id) {
      dispatch(setSelectedPost(null));
    } else {
      dispatch(setSelectedPost(post));
    }
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
            const { id, title } = post;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      {
                        'is-light': id !== selectedPost?.id,
                      },
                    )}
                    onClick={() => handleSelectPost(post)}
                  >
                    {id === selectedPost?.id ? 'Close' : 'Open'}
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
