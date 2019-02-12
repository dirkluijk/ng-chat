import { UserInfo } from 'firebase';

export interface Message {
  id?: string;
  user: UserInfo;
  body: string;
  datePosted: number;
}
