// src/types/context.ts
export interface CustomContext {
  getUsers: (path?: string) => Promise<Response>;
  getPosts: (path?: string) => Promise<Response>;
}
