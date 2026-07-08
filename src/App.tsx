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
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { usersSlice } from './features/users';
import { authorSlice } from './features/author';
import { postsSlice } from './features/posts';
import { selectedPostSlice } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const users = useAppSelector(state => state.users);

  useEffect(() => {
    if (users.length === 0) {
      getUsers().then(data => dispatch(usersSlice.actions.setUsers(data)));
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    dispatch(selectedPostSlice.actions.setSelectedPost(null));

    if (author) {
      dispatch(postsSlice.actions.setLoaded(false));
      dispatch(postsSlice.actions.setError(false));

      getUserPosts(author.id)
        .then(data => dispatch(postsSlice.actions.setItems(data)))
        .catch(() => dispatch(postsSlice.actions.setError(true)))
        .finally(() => dispatch(postsSlice.actions.setLoaded(true)));
    } else {
      dispatch(postsSlice.actions.setItems([]));
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
                  onChange={user =>
                    dispatch(authorSlice.actions.setAuthor(user))
                  }
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
                    onPostSelected={post =>
                      dispatch(selectedPostSlice.actions.setSelectedPost(post))
                    }
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
