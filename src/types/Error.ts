export enum Error {
  None = '',
  GetPosts = 'Unable to get a user posts',
  GetComments = 'Unable to get a comments',
  AddComment = 'Unable to add new comment',
}

export interface ErrorForm {
  name: boolean,
  email: boolean,
  body: boolean,
}
