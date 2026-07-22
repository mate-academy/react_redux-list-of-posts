/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setError, setLoaded, setPosts } from '../features/posts';
import { getPosts, getUserPosts } from '../api/posts';
import { setSelectedPost } from '../features/selectedPost';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const author = useAppSelector(state => state.author.currentAuthor);

  useEffect(() => {
    dispatch(setLoaded(false));
    dispatch(setError(false));

    const fetchPosts = author ? getUserPosts(author.id) : getPosts();

    fetchPosts
      .then(p => {
        dispatch(setPosts(p));
      })
      .catch(() => dispatch(setError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }, [dispatch, author]);

  if (!posts.loaded || posts.hasError || posts.items.length === 0) {
    return null;
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
          {posts.items.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    if (selectedPost?.id === post.id) {
                      dispatch(setSelectedPost(null));
                    } else {
                      dispatch(setSelectedPost(post));
                    }
                  }}
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
