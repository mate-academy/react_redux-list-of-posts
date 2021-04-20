export type OPTIONS = {
  method: string;
}

export type POST = {
  id: number,
  userId: number,
  title?: string,
  body?: string,
  createdAt: string,
  updatedAt: string,
}

export type COMMENT = {
  id: number,
  postId?: number,
  name?: string,
  email?: string,
  body?: string,
  createdAt?: string,
  updatedAt?: string,
}

export type NEWCOMMENT = {
  id?: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}
