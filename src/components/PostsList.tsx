import { useCallback } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedPost } from '../features/selectedPostSlice';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const handleSelectPost = useCallback((post: Post) => {
    dispatch(setSelectedPost(post.id === selectedPost?.id ? null : post));
  }, [selectedPost]);

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
          {posts.map((currentPost: Post) => (
            <tr key={currentPost.id} data-cy="Post">
              <td data-cy="PostId">
                {currentPost.id}
              </td>
              <td data-cy="PostTitle">
                {currentPost.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': currentPost.id !== selectedPost?.id,
                    },
                  )}
                  onClick={() => handleSelectPost(currentPost)}
                >
                  {currentPost.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
