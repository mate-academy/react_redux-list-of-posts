import React, { useCallback, useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addError, addLoading, addPosts } from './features/postsSlice';
import { addSelectedPost } from './features/selectedPostSlice';
import { addAuthor } from './features/authorSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { author } = useAppSelector(state => state.author);

  const setLoaded = useCallback(
    (value: boolean) => dispatch(addLoading(value)),
    [dispatch],
  );
  const setPosts = useCallback(
    (value: Post[]) => dispatch(addPosts(value)),
    [dispatch],
  );
  const setError = useCallback(
    (value: boolean) => dispatch(addError(value)),
    [dispatch],
  );
  const setSelectedPost = useCallback(
    (value: Post | null) => dispatch(addSelectedPost(value)),
    [dispatch],
  );

  const setAuthor = useCallback(
    (value: User | null) => dispatch(addAuthor(value)),
    [dispatch],
  );

  const loadUserPosts = useCallback((userId: number) => {
    setLoaded(false);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      // We disable the spinner in any case
      .finally(() => setLoaded(true));
  }, [setPosts, setError, setLoaded]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author?.id, author, loadUserPosts, setPosts, setSelectedPost]);

  return (
    <main className="section">
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
