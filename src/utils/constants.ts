export const periods = ["Today", "This Week", "This Month"] as const;

export type Period = typeof periods[number];

export interface IMap {
  [key: string]: string;
}

export interface NewUser {
  username: string;
  password: string;
}

export interface User extends NewUser {
  id: string;
}
