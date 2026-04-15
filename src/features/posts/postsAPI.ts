import { getUserPosts } from '../../api/posts';

export async function fetchPosts(userId: number) {
  return getUserPosts(userId);

  /*
  return new Promise<Post[]>((resolve, reject) => {
    setTimeout(() => {
      getUserPosts(userId).then(resolve).catch(reject);
    }, 500);
  });
  */
}
