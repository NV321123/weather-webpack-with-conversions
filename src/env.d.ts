export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_BASE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}