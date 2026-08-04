import React, { useEffect } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPost';
import { Loader } from '../components/Loader';
import { fetchPosts } from '../features/posts';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const {
    items,
    loaded: loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loaded) {
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {items.map(post => {
            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td
                  className={cn({
                    'has-background-info': selectedPost?.id === post.id,
                  })}
                >
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': !selectedPost,
                    })}
                    onClick={() => {
                      dispatch(
                        setSelectedPost(
                          selectedPost?.id === post.id ? null : post,
                        ),
                      );
                    }}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
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
