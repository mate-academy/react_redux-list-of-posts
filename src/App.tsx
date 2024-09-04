import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { useAppSelector } from './app/hooks';
import {
  changeHasError,
  changeLoaded,
  changePosts,
} from './features/postSlice';
import { useDispatch } from 'react-redux';
import { changeSelectedPost } from './features/selectedPostSlice';

type SelectedPostType = null | Post;

export const App: React.FC = () => {
  const author = useAppSelector(store => store.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(store => store.posts);
  const selectedPost = useAppSelector(store => store.selectedPost);

  const dispatch = useDispatch();

  const setPosts = (newPosts: Post[]) => {
    dispatch(changePosts(newPosts));
  };

  const setLoaded = (val: boolean) => {
    dispatch(changeLoaded(val));
  };

  const setError = (val: boolean) => {
    dispatch(changeHasError(val));
  };

  const setSelectedPost = (value: SelectedPostType) => {
    dispatch(changeSelectedPost(value));
  };

  function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      // We disable the spinner in any case
      .finally(() => setLoaded(true));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
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
