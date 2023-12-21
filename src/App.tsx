import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addAuthor } from './features/authorSlice';
import { addSelectedPost } from './features/selectedPostSlice';
import { actions as postsActions } from './features/postsSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();
  const setAuthor = (value: User) => dispatch(addAuthor(value));
  const setSelectedPost = (value: Post | null) => dispatch(
    addSelectedPost(value),
  );
  const posts = useAppSelector(state => state.posts.items);
  const setPosts = (value: Post[]) => dispatch(postsActions.addPosts(value));
  const hasError = useAppSelector(state => state.posts.hasError);
  const setError = (value: boolean) => dispatch(postsActions.addError(value));
  const loaded = useAppSelector(state => state.posts.loaded);
  const setLoaded = (value: boolean) => dispatch(postsActions.addLoad(value));

  function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      // We disable the spinner in any case
      .finally(() => setLoaded(true));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
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

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
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
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
