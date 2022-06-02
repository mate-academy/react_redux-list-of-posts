export type MainState = {
  posts: Post[];
  postId: number | null;
  comments: Commentary[];
  selectedPost: Post | null;
};

export type FormState = {
  userName: string,
  userEmail: string,
  newComment: string,
  userError: string | null,
  emailError: string | null,
  commentError: string | null,
};

export type State = {
  mainState: MainState,
  formState: FormState,
};
