import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './store/hooks';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { setAuthor } from './store/slices/authorSlice';
import { setSelectedPost } from './store/slices/selectedPostSlice';
import { usePosts } from './hooks/usePosts';
import { useUsers } from './hooks/useUsers';
import { useComments } from './hooks/useComments';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.value);
  const selectedPost = useAppSelector(state => state.selectedPost.value);
  const { posts, isLoaded: loaded, hasError } = usePosts(author);
  const { users, isLoaded: usersLoaded, hasError: usersError } = useUsers();
  const { comments } = useComments();

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => {
                    dispatch(setAuthor(user));
                    dispatch(setSelectedPost(null));
                  }}
                  users={usersLoaded && !usersError ? users : []}
                  isLoading={!usersLoaded}
                  hasError={usersError}
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
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  user={author}
                  comments={comments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
