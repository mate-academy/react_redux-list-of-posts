/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './features/users/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  actions as authorActions,
  selectAuthor,
} from './features/author/authorSlice';
import {
  actions as postsActions,
  selectPosts,
} from './features/posts/postsSlice';
import {
  actions as selectedPostActions,
  selectSelectedPost,
} from './features/selectedPost/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(selectAuthor);
  const { posts, loaded, hasError } = useAppSelector(selectPosts);
  const selectedPost = useAppSelector(selectSelectedPost);

  const setAuthor = (newAuthor: User) => {
    dispatch(authorActions.setAuthor(newAuthor));
  };

  const setSelectedPost = (newPost: Post | null) => {
    dispatch(selectedPostActions.setSelectedPost(newPost));
  };

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setLoaded(false));

    getUserPosts(userId)
      .then(postsFromServer => dispatch(postsActions.setPosts(postsFromServer)))
      .catch(() => dispatch(postsActions.setError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(postsActions.setLoaded(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.setPosts([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
