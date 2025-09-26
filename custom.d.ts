/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    ability?: any;
    user?: any;
    locale?: "vi" | "en";
    dataLog: any;
    businessLocationIds: any;
  }

  export interface Response {
    code?: number;
    data?: any;
    body?: any;
  }
}
