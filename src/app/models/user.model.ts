import { Application } from './index';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatus;
  jobs: Application[];
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
} 