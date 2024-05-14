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
import {
  fetchPosts,
  removeSelectedPost,
} from './components/postsSlice/postsSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.users.author);
  const { posts, selectedPost, loading, hasError } = useAppSelector(
    state => state.posts,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeSelectedPost());

    if (author) {
      dispatch(fetchPosts(author.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

  const load = author && !loading && !hasError;
  const error = author && hasError;
  const noPosts = author && loading && !hasError && !posts.length;
  const showPostsList = author && loading && !hasError && !!posts.length;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {load && <Loader />}

                {error && (
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

                {showPostsList && (
                  <PostsList posts={posts} selectedPostId={selectedPost?.id} />
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
                <PostDetails post={selectedPost} key={selectedPost.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
