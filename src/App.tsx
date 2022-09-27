import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { setSelectedPost } from './features/posts/selectedPost';
import { RootState } from './app/store';
import { setPosts, setLoaded, setHasError } from './features/posts/posts';
import { setUsers } from './features/posts/users';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const selectedPost = useSelector((state: RootState) => (
    state.selectedPost.selectedPost
  ));
  const post = useSelector((state: RootState) => (
    state.posts.posts.find(selectPost => selectPost.id === selectedPost)
  ));
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then(res => dispatch(setUsers(res)));
  }, []);

  const author = useSelector((state: RootState) => state.author.author);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loaded = useSelector((state: RootState) => state.posts.loaded);
  const hasError = useSelector((state: RootState) => state.posts.hasError);

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then(res => dispatch(setPosts(res)))
      .catch(() => dispatch(setHasError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(setLoaded(true)));
  }

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author?.id]);

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

                {author && loaded && !hasError && posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts?.length !== 0 && (
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
              {(selectedPost && post) && (
                <PostDetails post={post} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
