export interface IPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface IResponse {
  posts: IPosts[];
  total: number;
  skip: number;
  limit: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}

export interface ICommentResponse {
  comments: IComment[];
  total: number;
  skip: number;
  limit: number;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}
