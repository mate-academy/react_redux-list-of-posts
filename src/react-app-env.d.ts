interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  email: string,
}

interface PostComment {
  id: number,
  postId: number,
  body: string,
}
