import { getPosts, getUsers, getComments } from '../API/getData';
import { createActionSetPosts } from '../store/posts'
import { createActionSetLoading } from '../store/isLoading';
import { createActionSetLoaded } from '../store/isLoaded';

export const createActionLoadData = () => async(dispatch) => {
  dispatch(createActionSetLoading(true));

  try {
    const [
      posts,
      users,
      comments,
    ] = await Promise.all([getPosts(), getUsers(), getComments()]);

    dispatch(createActionSetPosts(posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }))));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(createActionSetLoading(false))
    dispatch(createActionSetLoaded());
  }
};
