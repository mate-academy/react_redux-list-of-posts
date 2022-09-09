import React, { useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useGetPostsByUserIdQuery } from './features/api/posts';

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const { data, isError, isLoading } = useGetPostsByUserIdQuery(userId || -1,
    { refetchOnMountOrArgChange: true });

  const posts = useMemo(() => {
    return data || [];
  }, [data, userId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={userId} onChange={setUserId} />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {userId && isLoading && (
                  <Loader />
                )}

                {userId && !isLoading && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userId && !isLoading && !isError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userId && !isLoading && !isError && posts.length > 0 && (
                  <PostsList
                    selectedPostId={selectedPostId}
                    onPostSelectedId={setSelectedPostId}
                    userId={userId}
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
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && (
                <PostDetails postId={selectedPostId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
