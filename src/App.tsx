import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { asyncGetUsers } from './features/Users/usersSlice';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useAppDispatch } from './app/hooks';
import { asyncGetPosts } from './features/Posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useSelector((state: RootState) => state.author);
  const posts = useSelector((state: RootState) => state.posts);
  const selectedPost = useSelector((state: RootState) => state.selecetedPost);
  const isPosts =
    author.value && posts.status === 'idle' && posts.value.length === 0;

  useEffect(() => {
    dispatch(asyncGetUsers());
  }, []);

  useEffect(() => {
    if (author.value) {
      dispatch(asyncGetPosts(author.value.id));
    }
  }, [author.value]);

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
                {!author.value && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {author.value && posts.status === 'loading' && <Loader />}

                {author.value && posts.status === 'failed' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author.value &&
                  posts.status === 'idle' &&
                  posts.value.length > 0 && <PostsList posts={posts.value} />}
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
              {!!selectedPost.value && (
                <PostDetails post={selectedPost.value} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
