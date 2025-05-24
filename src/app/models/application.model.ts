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
  INTERVIEWING = 'INTERVIEWING',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  WITHDRAWN = 'WITHDRAWN'
} 