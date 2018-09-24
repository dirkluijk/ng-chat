import { UserInfo } from 'firebase';

export interface Message {
  user: UserInfo;
  body: string;
  datePosted: number;
}
