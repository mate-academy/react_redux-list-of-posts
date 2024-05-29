import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './hooks';
import { getUsersPosts } from './redux/posts/operations';
import { addSelectedPost } from './redux/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const { items, hasError, loaded } = useAppSelector(state => state.posts);

  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const author = useAppSelector(state => state.author.author);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addSelectedPost(null));

    if (author) {
      dispatch(getUsersPosts(author.id));
    }
  }, [author, dispatch]);

  const visiblePostList = author && !loaded && !hasError && !!items?.length;
  const noPostsMessage = author && !loaded && !hasError && !items?.length;

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

                {author && loaded && <Loader />}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {visiblePostList && <PostsList />}
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
