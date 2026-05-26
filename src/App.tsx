import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useDispatch } from 'react-redux';
import { setAuthor } from './features/author/author-slice';
import { useAppSelector } from './app/hooks';
import { setPosts } from './features/posts/posts-slice';
import { setLoaded } from './features/posts/posts-slice';
import { setError } from './features/posts/posts-slice';
import { setSelectedPost } from './features/selectedPost/selectedpost-slice';
import { getUsers } from './api/users';
import { setUsers } from './features/users/users-slice';

export const App: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);
  const author = useAppSelector(state => state.author.selectedAuthor);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  const dispatch = useDispatch();

  const loadUserPosts = useCallback(
    (userId: number) => {
      getUserPosts(userId)
        .then(dados => dispatch(setPosts(dados)))
        .catch(() => dispatch(setError(true)))
        // We disable the spinner in any case
        .finally(() => dispatch(setLoaded(true)));
    },
    [dispatch],
  );

  useEffect(() => {
    // we clear the post when an author is changed
    // not t o confuse the user
    dispatch(setSelectedPost(null));
    if (author && author.id) {
      dispatch(setLoaded(false));
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch, loadUserPosts]);

   useEffect(() => {
    getUsers()
      .then(dados => dispatch(setUsers(dados)))
      .catch();
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
                  onChange={newAuthor => dispatch(setAuthor(newAuthor))}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
