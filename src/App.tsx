import React, { useEffect, useState } from 'react';
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
import { setPost } from './features/posts';
import { setSelectedPost } from './features/selectedPost';
import { AppDispatch, loadUsers } from './features/allUsers';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.post);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  // const [author, setAuthor] = useState<User | null>(null);
  const author = useSelector((state: RootState) => state.user);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const selectedPost = useSelector((state: RootState) => state.selectedPost);
  const shouldShowNoPosts =
    author && loaded && !hasError && posts && posts.length === 0;

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(post => dispatch(setPost(post)))
      .catch(() => setError(true))
      // We disable the spinner in any case
      .finally(() => setLoaded(true));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPost([]));
    }
  }, [author, dispatch]);

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

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts && posts.length > 0 && (
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
