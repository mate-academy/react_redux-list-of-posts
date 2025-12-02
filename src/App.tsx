import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { AppDispatch, RootState } from './app/store';
import { Author } from './types/Author';
import { setAuthor } from './features/author/authorSlice';
import { setLoaded, setPosts, setError } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { fetchUsersThunk } from './features/user/usersSlice';
import { useCustomDispatch, useCustomSelector } from './hooks/hooks';

export const App: React.FC = () => {
  const dispatch = useCustomDispatch<AppDispatch>();

  const { author, items, loaded, hasError, selectedPost, users } =
    useCustomSelector((rootState: RootState) => {
      return {
        ...rootState.authorReducer,
        ...rootState.postsReducer,
        ...rootState.selectedPostReducer,
        ...rootState.usersReducer,
      };
    });

  const handleAuthor = (authorArg: Author) => {
    dispatch(setAuthor({ author: authorArg }));
  };

  function loadUserPosts(userId: number) {
    dispatch(
      setLoaded({
        loaded: false,
      }),
    );

    getUserPosts(userId)
      .then((posts: Post[]) => {
        dispatch(
          setPosts({
            items: posts,
          }),
        );
      })
      .catch(() => {
        dispatch(
          setError({
            hasError: true,
          }),
        );
      })
      // We disable the spinner in any case
      .finally(() =>
        dispatch(
          setLoaded({
            loaded: true,
          }),
        ),
      );
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(
      setSelectedPost({
        selectedPost: null,
      }),
    );

    if (author) {
      loadUserPosts(author.id);
    } else {
      return;
    }
  }, [author]);

  const handleSelectedPost = (post: Post) => {
    dispatch(
      setSelectedPost({
        selectedPost: post,
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  value={author}
                  onChange={handleAuthor}
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

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
                  <PostsList
                    posts={items}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="tile is-parent">
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
