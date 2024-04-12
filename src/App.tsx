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
import { fetchPosts, setPosts } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const authorId = author.id;

  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  const selectedPost = useAppSelector(state => state.selectedPost);
  const selectedPostId = selectedPost.id;

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(
      setSelectedPost({
        id: 0,
        userId: 0,
        title: '',
        body: '',
      }),
    );

    if (authorId) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author, authorId, dispatch]);

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
                {!authorId && <p data-cy="NoSelectedUser">No user selected</p>}

                {!!authorId && !loaded && <Loader />}

                {!!authorId && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!!authorId && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!authorId && loaded && !hasError && posts.length > 0 && (
                  <PostsList />
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
                'Sidebar--open': !!selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPostId && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
