import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import {
  clearPosts,
  setError,
  setPosts,
  startLoading,
} from './features/postsSlice';
import { setAuthor } from './features/authorSlice';
import { selectPost } from './features/selectedPostSlice';
import { getUsers } from './api/users';
import { setUsers } from './features/usersSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPost = useSelector((state: RootState) => state.selectedPost);

  const author = useSelector((state: RootState) => state.author);
  const {
    loaded,
    hasError,
    items: posts,
  } = useSelector((state: RootState) => state.posts);

  /*function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(userPosts => dispatch(setPosts(userPosts)))
      .catch(() => dispatch(setError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(setLoaded(true)));
  }

  useEffect(() => {
    setSelectedPost(null);

    if (!author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author]);
*/
  useEffect(() => {
    dispatch(selectPost(null));

    if (!author) {
      dispatch(clearPosts());

      return;
    }

    dispatch(startLoading());

    getUserPosts(author.id)
      .then(userPosts => dispatch(setPosts(userPosts)))
      .catch(() => dispatch(setError()));
  }, [author, dispatch]);

  useEffect(() => {
    getUsers().then(usersFromServer => {
      dispatch(setUsers(usersFromServer));
    });
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                />
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

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
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
        </div>
      </div>
    </main>
  );
};
