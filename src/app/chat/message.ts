import { UserInfo } from 'firebase/auth';

export interface Message {
  user: UserInfo;
  body: string;
  datePosted: number;
}
