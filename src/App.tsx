import classNames from 'classnames';
import React, { useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { loadPosts, setUserId } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const { hasError, loaded } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const posts = useAppSelector(state => state.posts.items);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(setUserId(author.id));
      dispatch(loadPosts());
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
                {!author ||
                  (!Object.keys(author).length && (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  ))}

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
                  <PostsList posts={posts} />
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
