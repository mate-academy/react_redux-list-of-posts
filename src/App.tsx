import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
// import { Post } from './types/Post';
// import { Counter } from './features/counter/Counter';
import * as usersAction from './features/usersSlice';
import * as userPostsAction from './features/usersPostsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import classNames from 'classnames';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.users);
  const { selectedPost, userPosts } = useAppSelector(state => state.userPosts);

  useEffect(() => {
    dispatch(usersAction.init());
  }, [dispatch]);

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  // getUserPosts(userId)
  //   .then(response => {
  //     dispatch(userPostsAction.setUserPosts(response));
  //   })
  //   .catch(() => setError(true))
  //   // Відключаємо спінер в будь-якому випадку
  //   .finally(() => setLoaded(true));
  // }

  useEffect(() => {
    // ми очищаємо допис при зміні автора
    // щоб не заплутати користувача
    dispatch(userPostsAction.setSelectedPost(null));
    // setSelectedPost(null);

    if (author) {
      setLoaded(false);
      getUserPosts(author.id)
        .then(response => {
          dispatch(userPostsAction.setUserPosts(response));
        })
        .catch(() => setError(true))
        // Відключаємо спінер в будь-якому випадку
        .finally(() => setLoaded(true));
    } else {
      dispatch(userPostsAction.setUserPosts([]));
    }
  }, [author, dispatch]);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <h2>{error}</h2>;
  // }

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && userPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && userPosts.length > 0 && (
                  <PostsList />
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
          {/* <Counter /> */}
        </div>
      </div>
    </main>
  );
};
