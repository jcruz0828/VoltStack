import { Company, User } from './index';

export interface Application {
  id: number;
  jobTitle: string;
  jobStatus: JobStatus;
  company: Company;
  user: User;
}

export enum JobStatus {
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ON_HOLD = 'ON_HOLD',
  PENDING = 'PENDING',
  FOLLOW_UP = 'FOLLOW_UP',
  ARCHIVED = 'ARCHIVED'
} 