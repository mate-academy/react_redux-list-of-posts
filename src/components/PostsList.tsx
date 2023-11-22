import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// eslint-disable-next-line max-len
import { setSelectedPost } from '../features/selectedPost/selectedPostSlice';
import { Post } from '../types/Post';
import { Loader } from './Loader';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loading, hasError } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const onPostSelected = (currentPost: Post) => {
    if (currentPost.id === selectedPost?.id) {
      dispatch(setSelectedPost(null));
    } else {
      dispatch(setSelectedPost(currentPost));
    }
  };

  const isErrorVisible = !loading && hasError;
  const arePostsVisible = !loading && !hasError;

  return (
    <div data-cy="PostsList">
      {loading && (<Loader />)}

      {isErrorVisible && (
        <div className="notification is-danger">
          Something went wrong
        </div>
      )}

      {arePostsVisible && (
        <>
          <p className="title">Posts:</p>

          <table
            className="table is-fullwidth is-striped is-hoverable is-narrow"
          >
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
                        onClick={() => {
                          onPostSelected(post);
                        }}
                      >
                        {id === selectedPost?.id ? 'Close' : 'Open'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
