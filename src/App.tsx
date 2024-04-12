import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/hooks';
import { getPostsAsync, postsSliceActions } from './features/postsSlice';
import { SelecterPostState, selectPost } from './features/selectedPostSlice';
import { AuthorState } from './features/authorSlice';

export const App: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.data);
  const loaded = useSelector((state: RootState) => state.posts.loading);
  const hasError = useSelector((state: RootState) => state.posts.error);
  const author = useSelector((state: RootState) => state.author) as AuthorState;
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost,
  ) as SelecterPostState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectPost(null));

    if (author) {
      dispatch(getPostsAsync(author.id));
    } else {
      dispatch(postsSliceActions.clearPosts());
    }
  }, [author]);

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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
