// export function fetchMessage(): Promise<string> {
// //   // this is just a fake promise resolved in 2 seconds
// //   return new Promise(resolve => {
// //     setTimeout(() => {
// //       resolve('Message from server');
// //     }, 2000);
// //   });
// // }
import { ensure } from './helpers';

const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

const fetchData = <T>(url: string): Promise<T[]> => {
  return fetch(API_URL + url)
    .then(response => response.json());
};

const posts: Promise<Post[]> = fetchData('posts.json');

const users: Promise<User[]> = fetchData('users.json');

const comments: Promise<Comment[]> = fetchData('comments.json');

export const postsFromServer = Promise.all([posts, users, comments])
  .then(result => {
    return result[0].map(post => (
      {
        ...post,
        user: ensure(result[1].find(user => user.id === post.userId)),
        comments: result[2].filter(comment => comment.postId === post.id),
      }
    ));
  });
