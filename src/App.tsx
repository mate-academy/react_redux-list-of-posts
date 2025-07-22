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
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  fetchPostsByAuthor,
  setAuthor,
  setSelectedPost,
} from './features/posts/postsSlice';
import { init } from './features/users/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loading: loadingUsers, error: errorUsers } = useAppSelector(
    state => state.users,
  );

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const {
    author,
    items: posts,
    selectedPost,
    loading: loadingPosts,
    error: errorPosts,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (author) {
      dispatch(fetchPostsByAuthor(author.id));
    }
  }, [dispatch, author]);

  const handleSetAuthor = (user: User | null) => {
    dispatch(setAuthor(user));
  };

  const handleSetSelectedPost = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              {errorUsers ? (
                <p>{errorUsers}</p>
              ) : (
                <>
                  <div className="block">
                    <UserSelector value={author} onChange={handleSetAuthor} />
                  </div>
                  <div className="block" data-cy="MainContent">
                    {!loadingUsers && !author && (
                      <p data-cy="NoSelectedUser">No user selected</p>
                    )}

                    {author && loadingPosts && <Loader />}

                    {author && errorPosts && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorPosts}
                      </div>
                    )}

                    {author &&
                      !loadingPosts &&
                      !errorPosts &&
                      (posts.length === 0 ? (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      ) : (
                        <PostsList
                          posts={posts}
                          selectedPostId={selectedPost?.id}
                          onPostSelected={handleSetSelectedPost}
                        />
                      ))}
                  </div>
                </>
              )}
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
