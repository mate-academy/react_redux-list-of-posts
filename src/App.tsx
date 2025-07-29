import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { RootState, AppDispatch } from './app/store';

// Импортируем экшены
import { clearSelectedPost } from './features/selectedPost/selectedPostSlice';
import { fetchPosts, clearPosts } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const author = useSelector((state: RootState) => state.author.current);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.post || null,
  );
  const {
    items = [],
    loaded = false,
    error = null,
  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(fetchPosts(author.id));
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
                {!author && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {author && !loaded && <Loader />}

                {author && loaded && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !error && items.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {author && loaded && !error && items.length > 0 && (
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
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
