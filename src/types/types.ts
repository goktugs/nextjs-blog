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
