import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useAppDispatch } from './app/hooks';
import { authorSlice } from './features/author/authorSlice';
import { fetchPosts, postsSlice } from './features/posts/postsSlice';
import { selectedPost } from './features/selectedPost/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useSelector((state: RootState) => state.author);
  const { id } = author;

  const { items, hasError, loaded } = useSelector(
    (state: RootState) => state.posts,
  );
  const post = useSelector((state: RootState) => state.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(fetchPosts(userId));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPost.actions.setSelectedPost(null));

    if (author) {
      loadUserPosts(id);
    } else {
      dispatch(postsSlice.actions.clear());
    }
  }, [dispatch, id, loadUserPosts, author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={value =>
                    dispatch(authorSlice.actions.setAuthor(value))
                  }
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!id && <p data-cy="NoSelectedUser">No user selected</p>}

                {id && !loaded && <Loader />}

                {id && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {id && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {id && loaded && !hasError && items.length > 0 && (
                  <PostsList posts={items} selectedPostId={post?.id} />
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && <PostDetails post={post} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
