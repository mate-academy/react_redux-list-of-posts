import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Author } from './features/author/authorSlice';
import * as authorActions from './features/author/authorSlice';
import * as postsAcitons from './features/posts/postsSlice';
import { SelectedPost } from './features/selectedPost/selectedPostSlice';
// eslint-disable-next-line max-len
import * as selectedPostActions from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const setSelectedPost = useCallback(
    (newSelectedPost: SelectedPost) => {
      dispatch(selectedPostActions.set(newSelectedPost));
    },
    [dispatch],
  );

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      dispatch(postsAcitons.setUserPosts(author.id));
    }
  }, [author, dispatch, setSelectedPost]);

  const setAuthor = (newAuthor: Author) => {
    dispatch(authorActions.set(newAuthor));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
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
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
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
