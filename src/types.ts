export type UserType = {
  name: string;
  email: string;
}

export interface GitConfig {
  user: UserType;
  core?: {
    editor?: string;
    [key: string]: any;
  }
  [key: string]: any;
}

