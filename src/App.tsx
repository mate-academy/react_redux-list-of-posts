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
// import { Post } from './types/Post';
import { Counter } from './features/counter/Counter';
import { setAuthor } from './features/authorSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import { User } from './types/User';
import { setPosts, setLoaded, setHasError } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(
    (state: RootState) => state.author,
  ) as User | null;

  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { posts, loaded, hasError } = useAppSelector(
    (state: RootState) => state.posts,
  );
  const { selectedPost } = useAppSelector(
    (state: RootState) => state.selectedPost,
  );

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then((data) => {
        dispatch(setPosts(data));
      })
      .then(() => {
        dispatch(setAuthor(author));
      })
      .catch(() => dispatch(setHasError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(setLoaded(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={(user) => dispatch(setAuthor(user))}
                />
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
              {selectedPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
