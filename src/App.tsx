import React, { useEffect, useCallback } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearPosts, fetchUserPosts } from './features/posts/postsSlice';
import { clearAuthor, setAuthor } from './features/author/authorSlice';
import { User } from './types/User';
import {
  clearSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  //const [posts, setPosts] = useState<Post[]>([]);
  //const [loaded, setLoaded] = useState(false);
  //const [hasError, setError] = useState(false);
  const dispatch = useAppDispatch();

  const { items: posts, loaded, hasError } = useAppSelector(s => s.posts);
  const { author } = useAppSelector(s => s.author);
  const { selectedPost } = useAppSelector(s => s.selectedPost);

  //const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(fetchUserPosts(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(clearSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch, loadUserPosts]);

  useEffect(() => {
    dispatch(clearAuthor());
  }, [dispatch]);

  const handleAuthorChange = (newAuthor: User) => {
    dispatch(setAuthor(newAuthor));
  };

  const handlePostSelection = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

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
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handlePostSelection}
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
