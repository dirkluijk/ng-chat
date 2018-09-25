import { UserInfo } from 'firebase/auth';

export interface Message {
  id?: string;
  user: UserInfo;
  body: string;
  datePosted: number;
}
