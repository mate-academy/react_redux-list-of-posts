import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectAuthor, set } from './features/author/authorSlice';
import { clearPosts, loadPosts } from './features/posts/postsSlice';
import { select } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(state => state.selectedPost.post);
  const dispatch = useAppDispatch();

  const handleAuthorChange = (val: User | null) => {
    dispatch(set(val));
  };

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(select(null));

    if (author) {
      dispatch(loadPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
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
