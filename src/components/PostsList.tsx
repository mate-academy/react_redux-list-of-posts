import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectPosts } from '../features/posts/postsSlice';
import { selectPost, setSelectPost } from '../features/posts/selectedPostSlice';

export const PostsList = React.memo(() => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(selectPosts);
  const { selectedPost } = useAppSelector(selectPost);
  const selectedPostId = selectedPost?.id || 0;

  const navigation = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const initialPost = posts
      .find(post => post.id === +location.search.slice(6)) || null;

    dispatch(setSelectPost(initialPost));
  }, []);

  return (
    <div className="PostsList">
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
            const handlePostSelect = () => {
              if (post.id !== selectedPostId) {
                searchParams.set('post', `${post.id}`);
              } else {
                searchParams.delete('post');
              }

              navigation(`?${searchParams}`, { replace: true });
            };

            return (
              (
                <tr key={post.id}>
                  <th>{post.id}</th>
                  <td>{post.title}</td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      className={classNames(
                        'button',
                        'is-link',
                        {
                          'is-light': post.id !== selectedPostId,
                        },
                      )}
                      onClick={() => {
                        handlePostSelect();
                        dispatch(setSelectPost(post.id === selectedPostId
                          ? null
                          : post));
                      }}
                    >
                      {post.id === selectedPostId ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
