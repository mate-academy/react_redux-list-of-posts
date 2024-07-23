/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as authorActions } from './app/author';
import { User } from './types/User';
import { actions as postsActions, setPosts } from './app/posts';
import { actions as selectPostActions } from './app/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const { set } = authorActions;
  const { clear } = postsActions;
  const { setSelectedPost, clearSelectedPost } = selectPostActions;

  const isNotUserSelected = !author || (author && author.id === 0);
  const isLoad = author && loaded;
  const isError = author && !loaded && hasError;
  const isNotPosts = !loaded && !hasError && posts.length === 0;

  useEffect(() => {
    dispatch(clear());

    if (author && author.id) {
      dispatch(setPosts(author.id));
    } else {
      dispatch(clear());
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={(user: User) => {
                    dispatch(set(user));
                    dispatch(clearSelectedPost());
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isNotUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoad && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isNotUserSelected && (
                  <>
                    {isNotPosts && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!isNotPosts && !loaded && (
                      <PostsList
                        posts={posts}
                        selectedPostId={selectedPost.id}
                        onPostSelected={(post: Post) =>
                          dispatch(setSelectedPost(post))
                        }
                        clear={() => {
                          dispatch(clearSelectedPost());
                        }}
                      />
                    )}
                  </>
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
                'Sidebar--open': selectedPost.id > 0,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost.id > 0 && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
