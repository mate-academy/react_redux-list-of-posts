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
import { selectAuthor, setAuthor } from './features/author/authorSlice';
import {
  loadPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoaded,
} from './features/posts/postsSlice';
import {
  clearSelectedPost,
  selectSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const posts = useAppSelector(selectPosts);
  const loaded = useAppSelector(selectPostsLoaded);
  const hasError = useAppSelector(selectPostsError);
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  // console.log('App state:', {
  //   author: author?.id,
  //   posts: posts.length,
  //   loaded,
  //   hasError,
  // });

  useEffect(() => {
    // console.log('Author changed:', author?.id);

    dispatch(clearSelectedPost());

    if (author) {
      // console.log('Loading posts for user:', author.id);

      dispatch(loadPosts(author.id));
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
                  onChange={user => dispatch(setAuthor(user))}
                />
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
