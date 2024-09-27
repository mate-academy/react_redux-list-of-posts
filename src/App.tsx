import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedPost } from './slices/selectedPostSlice';
import { fetchUserPosts } from './slices/postSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.user);
  const {
    items: userPosts,
    loaded,
    hasError: postsError,
  } = useAppSelector(state => state.post);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchUserPosts(author.id));
    }
  }, [author, dispatch]);

  const noAuthor = !author;
  const loading = author && !loaded;
  const errorOccurred = author && loaded && postsError;
  const noPosts = author && loaded && !postsError && userPosts.length === 0;
  const hasPosts = author && loaded && !postsError && userPosts.length > 0;

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
                {noAuthor && <p data-cy="NoSelectedUser">No user selected</p>}

                {loading && <Loader />}

                {errorOccurred && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && <PostsList />}
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
