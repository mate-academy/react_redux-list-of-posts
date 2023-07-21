import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPost, unsetPost } from '../features/selectedPost/selectedPostSlice';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { value: posts } = useAppSelector(state => state.posts);
  const selectedPostId = useAppSelector(state => state.selectedPost.value?.id);
  const statusSelectedPost = useAppSelector(state => state.selectedPost.status);

  function handleSelectingPost(post: Post) {
    switch (statusSelectedPost) {
      case 'selected':
        dispatch(unsetPost());
        break;

      case 'unselected':
        dispatch(setPost(post));
        break;

      default:
        break;
    }

    if (selectedPostId !== post.id) {
      dispatch(setPost(post));
    }
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
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => handleSelectingPost(post)}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
