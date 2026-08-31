import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';
import { setCurrentAuthor } from './features/authorSlice';
import { useAppDispatch } from './app/hooks';
import { clearPosts, fetchPosts } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPostSlice';

export const App: React.FC = () => {
  const currentAuthor = useSelector((state: RootState) => state.author);
  const selectedPost = useSelector((state: RootState) => state.selectedPost);
  const {
    items: posts,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPost(null));
    if (currentAuthor) {
      dispatch(fetchPosts(currentAuthor.id));
    } else {
      dispatch(clearPosts());
    }
  }, [currentAuthor, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={currentAuthor}
                  onChange={user => dispatch(setCurrentAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentAuthor && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {currentAuthor && !loaded && <Loader />}

                {currentAuthor && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentAuthor && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentAuthor && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
                  />
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
                <PostDetails key={selectedPost.id} post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
