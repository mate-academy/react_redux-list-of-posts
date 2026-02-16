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
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/author/aurhorSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { setError, setPosts, startLoading } from './features/posts/postsSlice';
import { getUsers } from './api/users';
import { setUsers } from './features/users/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  function loadUserPosts(userId: number) {
    dispatch(startLoading());

    getUserPosts(userId)
      .then(postsData => {
        dispatch(setPosts(postsData));
      })
      .catch(() => dispatch(setError()));
    // // We disable the spinner in any case
    // .finally(() => setLoaded(true));
  }

  useEffect(() => {
    getUsers().then(users => dispatch(setUsers(users)));
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={newUser => dispatch(setAuthor(newUser))}
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
                    onPostSelected={newPost =>
                      dispatch(setSelectedPost(newPost))
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
