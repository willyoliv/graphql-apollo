// src/types/context.ts
export interface CustomContext {
  getUsers: (path?: string) => Promise<Response>;
}
