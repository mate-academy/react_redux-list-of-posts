import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
// import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
// import { actions as authorActions } from './features/authorSlice';
import { actions as postActions } from './features/postsSlice';
import { actions as selectedPostActions } from './features/selectedPostSlice';
import { fetchPostsAsync } from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // const [author, setAuthor] = useState<User | null>(null);
  const author = useAppSelector(state => state.author.value);
  const selectedPost = useAppSelector(state => state.selectedPost.value);

  const {
    items: posts,
    hasError,
    loaded,
  } = useAppSelector(state => state.posts);

  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     // We disable the spinner in any case
  //     .finally(() => setLoaded(true));
  // }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user

    // dispatch(postActions.clear());

    if (author) {
      // Load posts
      dispatch(selectedPostActions.clear());
      dispatch(fetchPostsAsync(author.id));
    } else {
      dispatch(postActions.clear());
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
