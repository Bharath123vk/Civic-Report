export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ROLE_CITIZEN' | 'ROLE_ADMIN';
  createdAt: string;
}

export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface Issue {
  id: number;
  title: string;
  description: string;
  location: string;
  status: IssueStatus;
  upvoteCount: number;
  reportedBy: User;
  createdAt: string;
  updatedAt?: string;
}
