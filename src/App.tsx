import { FC, useCallback, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedPost } from './features/selectedPost/selectedPost';
import { selectedPostSelector } from './features/selectedPost/selectors';
import { resetPosts } from './features/posts/postsSlice';
import { fetchPosts } from './features/posts/asyncActions';
import { authorSelector } from './features/author/selectors';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(authorSelector);
  const { selectedPost } = useAppSelector(selectedPostSelector);

  const handleAuthorsPosts = useCallback(
    (commentAuthor: User | null) => {
      dispatch(setSelectedPost(null));

      if (commentAuthor) {
        dispatch(fetchPosts(commentAuthor.id));
      } else {
        dispatch(resetPosts());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    handleAuthorsPosts(author);
  }, [author, handleAuthorsPosts]);

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
