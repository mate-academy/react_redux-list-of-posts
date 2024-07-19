import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { setUsers } from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectAuthor, setAuthor } from './features/author/authorSlice';
import {
  fetchPostsByUserId,
  selectPosts,
  selectPostsStatus,
} from './features/posts/postsSlice';
import {
  selectSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const author = useAppSelector(selectAuthor);
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostsStatus);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers().then(users => dispatch(setUsers(users)));
  }, [dispatch]);

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(items => dispatch(setPosts(items)))
  //     .catch(() => dispatch(setError(true)))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchPostsByUserId(author.id));
    }
  }, [author, dispatch]);

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

                {author && postsStatus === 'items' && <Loader />}

                {author && postsStatus === 'hasError' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsStatus === 'loaded' && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsStatus === 'loaded' && posts.length > 0 && (
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
