interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface User {
  id: number,
  name: string,
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface State {
  post: Post | null,
  posts: Post[],
  users: User[],
  user: User | null,
  comments: Comment[],
  userId: number,
  postId: number,
}

export interface Action {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
}
