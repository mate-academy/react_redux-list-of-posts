import classNames from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadApiPosts, selectPosts } from '../features/postsSlice';
import { selectAuthor } from '../features/authorSlice';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { setSelectedPost } from '../features/selectedPostSlice';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(s => s.selectedPost.selectedPost);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(s => s.posts.hasError);
  const author = useAppSelector(selectAuthor);
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    if (!author) {
      return;
    }

    dispatch(loadApiPosts(author?.id));
  }, [author]);

  const handleSelectPost = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  return (
    <>
      {author && !loaded && (
        <Loader />
      )}

      {author && loaded && hasError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {author && loaded && !hasError && posts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {author && loaded && !hasError && posts.length > 0 && (
        <div data-cy="PostsList">
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
                      onClick={() => handleSelectPost(post)}
                    >
                      {post.id === selectedPost?.id ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
