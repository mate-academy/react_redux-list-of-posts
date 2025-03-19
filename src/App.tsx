import React, { useEffect } from 'react';
import { deleteComment, createComment } from './api/comments';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
import { setAuthor } from './features/authorSlice';
import { setSelectedPost } from './features/selectedPostSlice';
import { getPostComments } from './api/comments';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: users } = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author.value);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.value);
  const { items: comments } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(getUserPosts(author.id));
    }
  }, [author, dispatch]);

  useEffect(() => {
    if (selectedPost) {
      dispatch(getPostComments(selectedPost.id));
    }
  }, [selectedPost, dispatch]);

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
  };

  const handleAddComment = async (comment: Comment) => {
    await dispatch(createComment(comment));
  };

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

          <div className="tile is-parent is-8-desktop Sidebar">
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  onDeleteComment={handleDeleteComment}
                  onAddComment={handleAddComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
