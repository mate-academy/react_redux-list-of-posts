import { getData } from '../utils';

export const DATA_REQUESTED = 'dataRequested';
export const DATA_LOADED = 'dataLoaded';

export const dataRequested = () => {
  return dispatch => {
    dispatch({
      type: DATA_REQUESTED
    });
    Promise.all([
      getData('https://jsonplaceholder.typicode.com/posts'),
      getData('https://jsonplaceholder.typicode.com/users'),
      getData('https://jsonplaceholder.typicode.com/comments')
    ])
      .then(([posts, users, comments]) => {
        const commentsMap = {};
        comments.forEach(el => {
          commentsMap[el.postId] ? commentsMap[el.postId].push(el) : commentsMap[el.postId] = [el];
        });

        const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
        
        const postsList = posts.map(post => ({
          ...post, comments: commentsMap[post.id], user: usersMap[post.userId]
        }))

        dispatch({
          type: DATA_LOADED,
          payload: postsList
        });
      })
  }
}

export const dataLoaded = (payload) => ({
  type: DATA_LOADED,
  payload
})


