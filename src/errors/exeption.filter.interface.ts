import { NextFunction, Request, Response } from 'express';

export interface IExeptionInterface {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
