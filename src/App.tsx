import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectAuthor } from './store/authorSlice';
import { resetComments } from './store/commentsSlice';
import {
  clearPosts,
  loadPostsByAuthor,
  selectPosts,
  selectPostsHasError,
  selectPostsLoaded,
} from './store/postsSlice';
import {
  resetSelectedPost,
  selectSelectedPost,
} from './store/selectedPostSlice';
import { loadUsers } from './store/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(selectAuthor);
  const posts = useAppSelector(selectPosts);
  const postsLoaded = useAppSelector(selectPostsLoaded);
  const postsHasError = useAppSelector(selectPostsHasError);
  const selectedPost = useAppSelector(selectSelectedPost);

  const showPostsError = Boolean(author && postsLoaded && postsHasError);
  const showNoPosts = Boolean(
    author && postsLoaded && !postsHasError && posts.length === 0,
  );
  const showPosts = Boolean(
    author && postsLoaded && !postsHasError && posts.length > 0,
  );

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetSelectedPost());
    dispatch(resetComments());

    if (author) {
      dispatch(loadPostsByAuthor(author.id));
    } else {
      dispatch(clearPosts());
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

                {author && !postsLoaded && <Loader />}

                {showPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && <PostsList />}
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
