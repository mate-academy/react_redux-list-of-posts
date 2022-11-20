import classNames from 'classnames';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getPosts } from './Posts/userPostsSlicer';
import { fetchPostComments, getPost, selectPost } from './Comments/commentsSlicer';

export const PostsList: React.FC = () => {
  const authorPosts = useAppSelector(getPosts);
  const selectedPost = useAppSelector(getPost);
  const dispatch = useAppDispatch();

  console.log('selectedPost');
  console.log(selectedPost);

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
          {authorPosts.map(post => (
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
                      'is-light': selectedPost && post.id !== selectedPost.id,
                    },
                  )}
                  onClick={() => {
                    dispatch(selectPost(post));
                    dispatch(fetchPostComments(post.id));
                  }}
                >
                  {
                    selectedPost && post.id === selectedPost.id
                      ? 'Close'
                      : 'Open'
                  }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
