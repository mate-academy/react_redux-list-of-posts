import { createSelector } from 'reselect';

const selectPosts = state => state.postList;
const selectUsers = state => state.userList;
const selectComments = state => state.commentList;

export const selectPostMap = createSelector(selectPosts, selectUsers, selectComments,
    (posts, users, comments) => {
  if(!posts || !users || !comments) {
    return [];
  }
  return posts.map(post => ({...post,
    user: users.find(user => user.id === post.userId),
    postComments: comments.filter(comment => comment.postId === post.id) }));
});

export const selectIsLoading = state => state.postLoading
  || state.userLoading
  || state.commentLoading;
export const selectIsLoaded = state => state.postList && state.userList && state.commentList;
