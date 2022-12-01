import classNames from 'classnames';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getPosts } from './Posts/userPostsSlicer';
import {
  clearSelectedPost,
  fetchPostComments,
  getPost,
} from './Comments/commentsSlicer';

export const PostsList: React.FC = () => {
  const authorPosts = useAppSelector(getPosts);
  const selectedPost = useAppSelector(getPost);
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
          {authorPosts.length > 0 ? (authorPosts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                {(selectedPost && post.id === selectedPost.id)
                  ? (
                    <button
                      type="button"
                      className={classNames(
                        'button',
                        'is-link',
                        {
                          'is-light': selectedPost
                            && post.id === selectedPost.id,
                        },
                      )}
                      onClick={() => dispatch(clearSelectedPost())}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames(
                        'button',
                        'is-link',
                        {
                          'is-light': selectedPost
                            && post.id !== selectedPost.id,
                        },
                      )}
                      onClick={() => {
                        dispatch(fetchPostComments(post));
                      }}
                    >
                      Open
                    </button>
                  )}
              </td>
            </tr>
          )))
            : (<div style={{ color: 'red' }}> Error </div>)}
        </tbody>
      </table>
    </div>
  );
};
