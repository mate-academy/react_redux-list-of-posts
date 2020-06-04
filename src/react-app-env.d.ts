interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  user?: User;
  commentList?: Comment[];
}
