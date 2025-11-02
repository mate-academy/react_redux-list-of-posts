import React, { useEffect } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsListContainer } from './containers/PostsListContainer';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/store';
import { clearPosts, fetchPostsByUser } from './slices/postsSlice';
import { selectPost } from './slices/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);
  const postsState = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  useEffect(() => {
    dispatch(selectPost(null));
    if (!author) {
      dispatch(clearPosts());
    } else {
      dispatch(fetchPostsByUser(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="columns">
          {/* Left column: selector + posts area */}
          <div className="column is-half">
            <div className="box">
              <div className="block">
                <UserSelector value={author} onChange={() => {}} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !postsState.loaded && <Loader />}

                {author && postsState.loaded && postsState.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  postsState.loaded &&
                  !postsState.hasError &&
                  postsState.items.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author && !postsState.hasError && <PostsListContainer />}
              </div>
            </div>
          </div>

          {/* Right column: post selection / details (same width as left) */}
          <div className="column is-half">
            <div className="box">
              {!selectedPost && (
                <div className="block" data-cy="ChoosePostPlaceholder">
                  <h2 className="title is-4">Choose a post</h2>
                </div>
              )}

              {selectedPost && (
                <div className="block">
                  <PostDetails post={selectedPost} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
