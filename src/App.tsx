import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './components/usersSlice';
import { fetchPosts } from './components/postsSlice';
import { setAuthor } from './components/authorSlice';
import { setSelectedPost } from './components/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const posts = useAppSelector(state => state.posts.items);
  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(
    state => state.selectedPosts.selectedPost,
  );
  const usersLoading = useAppSelector(state => state.users.loading);
  const usersError = useAppSelector(state => state.users.error);
  const postsLoaded = useAppSelector(state => state.posts.loaded);
  const postError = useAppSelector(state => state.posts.hasError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {usersLoading && <Loader />}
                {usersError && (
                  <div className="notification is-danger">
                    Failed to load users
                  </div>
                )}
                {!usersLoading && !usersError && (
                  <UserSelector
                    value={author}
                    onChange={user => dispatch(setAuthor(user))}
                    users={users}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !postError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
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
