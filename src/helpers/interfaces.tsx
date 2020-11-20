export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
  createdAt: any,
  updatedAt: any,
}

export interface Comments {
  id: number;
  name: string;
  body: string;
  email: string;
  postId: number;
  createdAt: any,
  updatedAt: any,
}
