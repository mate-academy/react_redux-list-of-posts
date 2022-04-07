const URL = 'https://mate.academy/students-api/posts';

export function fetchMessage(): Promise<string> {
  // this is just a fake promise resolved in 2 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Message from server');
    }, 2000);
  });
}

export const fetchPosts = async () => {
  try {
    const posts = await fetch(URL);

    return posts;
  } catch (error) {
    return console.log(error);
  }
};
