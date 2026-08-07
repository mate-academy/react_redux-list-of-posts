import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPost';
import { Loader } from '../components/Loader';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const { items, loaded, hasError } = useAppSelector(state => state.posts);

  if (!loaded) {
    return <Loader />;
  }

  if (hasError) {
    return <p>error</p>;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {items.map(post => {
            const currentSelectedPost = selectedPost?.id === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': !currentSelectedPost,
                    })}
                    onClick={() => {
                      dispatch(
                        setSelectedPost(currentSelectedPost ? null : post),
                      );
                    }}
                  >
                    {currentSelectedPost ? 'Close' : 'Open'}
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
