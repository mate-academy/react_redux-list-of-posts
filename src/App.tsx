import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor, selectAuthor } from './features/author/authorSlice';
import { fetchPosts } from './features/posts/postsSlice';
import {
  selectPost,
  selectSelectedPost,
} from './features/selectedPost/selectedPostSlice';

/* prettier-ignore */
export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(selectAuthor);
  const postsState = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(selectSelectedPost);
  const selectedPostId = useAppSelector(
    state => state.selectedPost.selectedPostId,
  );

  // 🔹 pobierz posty wybranego użytkownika
  useEffect(() => {
    dispatch(selectPost(null)); // reset selectedPostId przy zmianie autora

    if (author?.id) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={value => dispatch(setAuthor(value))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && postsState.isLoading && <Loader />}

                {author && postsState.error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsState.error.message}
                  </div>
                )}

                {author &&
                  !postsState.isLoading &&
                  !postsState.error &&
                  postsState.items.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                      No posts yet {author.name}
                  </div>
                )}

                {author &&
                  !postsState.isLoading &&
                  !postsState.error &&
                  postsState.items.length > 0 && (
                  <PostsList
                    posts={postsState.items}
                    selectedPostId={selectedPostId}
                    onPostSelected={value => dispatch(selectPost(value))}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
