import { Application } from './index';

export interface Company {
  id: number;
  description: string;
  company: string;
  applications: Application[];
} 