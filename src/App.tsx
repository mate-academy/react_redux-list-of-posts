import { useMemo } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { selectors } from './app/store';
import { useGetPostsByUserIdQuery, useGetUserQuery } from './features/apiSlice';

export const App = () => {
  const selectedUserId = useAppSelector(selectors.getSelectedUserId);
  const { data: author } = useGetUserQuery(selectedUserId);
  const selectedPostId = useAppSelector(selectors.getSelectedPostId);
  const {
    data: postsFromServer,
    isFetching,
    isError: hasError,
  } = useGetPostsByUserIdQuery(selectedUserId);

  const posts = useMemo(() => (postsFromServer || []), [postsFromServer]);

  const selectedPost = useMemo(() => {
    const post = posts.find(p => p.id === selectedPostId);

    return post || null;
  }, [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
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

                {author && isFetching && (
                  <Loader />
                )}

                {author && !isFetching && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isFetching && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isFetching && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
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
                'Sidebar--open': selectedPostId && selectedPostId !== 0,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && selectedPostId !== 0 && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
