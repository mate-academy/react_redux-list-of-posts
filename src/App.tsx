/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as usersActions from './features/users/users';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const author = useAppSelector(state => state.author);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }

  useEffect(() => {
    setSelectedPost(null);

    dispatch(usersActions.init());

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author, dispatch]);

  const isAuthorSelected = author.id !== 0;

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
                {!isAuthorSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isAuthorSelected && !loaded && <Loader />}

                {isAuthorSelected && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isAuthorSelected &&
                  loaded &&
                  !hasError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {isAuthorSelected &&
                  loaded &&
                  !hasError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={setSelectedPost}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
