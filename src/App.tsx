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
import { initUsers } from './features/users';
import { initPosts } from './features/posts';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);
  const { posts, isLoadindPosts, hasErrorPosts } = useAppSelector(
    state => state.posts,
  );
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const shouldShowPosts =
    author && !isLoadindPosts && !hasErrorPosts && posts.length > 0;

  const shouldShowNoPosts =
    author && !isLoadindPosts && !hasErrorPosts && posts.length === 0;

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  useEffect(() => {
    if (author) {
      dispatch(initPosts(author?.id));
    }
  }, [author]);

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

                {author && isLoadindPosts && <Loader />}

                {author && !isLoadindPosts && hasErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPosts && <PostsList posts={posts} />}
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
              {!isLoadindPosts && selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
