// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface PostComment extends NewComment {
  readonly 'id': number,
}

interface CommentsState {
  comments: PostComment[],
  isCommentsLoading: boolean,
  isCommentsVisible: boolean,
}

interface PostState {
  posts: Post[],
  selectedPostId: number,
  isPostsLoading: boolean,
}

interface UserState {
  users: User[],
  selectedUserId: number,
  isUsersLoading: boolean,
}
