export type GetMessages = (user: string) => void;

export type PostMessage = (user: string, author: string, message: string) => void;

export type Message = {
  thread: string;
  author: string;
  message: string;
  time: number;
  id: number;
};
