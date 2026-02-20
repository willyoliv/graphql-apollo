declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      PORT: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
