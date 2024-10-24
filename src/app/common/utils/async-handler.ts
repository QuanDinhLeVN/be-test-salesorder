import { Request, Response, NextFunction } from 'express';

// Async wrapper function to handle errors in async route handlers
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
