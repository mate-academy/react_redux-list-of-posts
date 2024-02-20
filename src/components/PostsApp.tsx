import { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { setSelectedPost } from '../features/posts/selectedPost';
import {
  setPosts,
  setIsLoading,
  loadPosts,
} from '../features/posts/posts';

export const PostsApp = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    errorMessage,
    posts,
  } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    if (author) {
      dispatch(loadPosts(author.id))
        .then(() => dispatch(setIsLoading(false)))
        .catch(() => dispatch(setIsLoading(false)));
    } else {
      dispatch(setPosts([]));
    }
  }, [dispatch, author]);

  useEffect(() => {
    setSelectedPost(null);
  }, [author]);

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector />
          </div>

          <div className="block" data-cy="MainContent">
            {!author && (
              <p data-cy="NoSelectedUser">
                No user selected
              </p>
            )}

            {isLoading && (
              <Loader />
            )}

            {author && isLoading && errorMessage && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>
            )}

            {author && !isLoading && !errorMessage && posts.length === 0 && (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            )}

            {author && !isLoading && !errorMessage && posts.length > 0 && (
              <PostsList
                posts={posts}
              />
            )}
          </div>
        </div>
      </div>

      <div
        data-cy="Sidebar"
        className={classNames(
          'tile',
          'is-parent',
          'is-8-desktop',
          'Sidebar',
          {
            'Sidebar--open': selectedPost,
          },
        )}
      >
        <div className="tile is-child box is-success ">
          {selectedPost && (
            <PostDetails post={selectedPost} />
          )}
        </div>
      </div>
    </div>
  );
};
