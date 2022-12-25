import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { Post } from '../types/Post';
import * as commentsActions from '../features/selectedPost';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost } = useAppSelector(state => state.comments);
  const { posts } = useAppSelector(state => state.posts);

  const handleDetails = (post: Post) => {
    if (post.id === selectedPost?.id) {
      dispatch(commentsActions.actions.closeDetails());
    } else {
      dispatch(commentsActions.actions.openDetails(post));
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
                      'is-light': post.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => handleDetails(post)}
                >
                  {post.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
