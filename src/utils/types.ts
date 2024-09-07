export type NodeEnvironment = "development" | "test" | "production";

export interface koraData {
  quesId: number;
  options: string;
  answer: number;
  question: string;
}

export type UserAttributes = {
  id: number;
  email: string;
  password: string;
  userName:string;
};

export type BaseExceptionType = {
  message: string | null;
  error?: any;
  code: number;
};

declare module "express" {
  interface Request {
    user?: UserAttributes;
  }
}