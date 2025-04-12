import { onRequest } from 'firebase-functions/v2/https';
import * as path from 'path';
import { Request, Response } from 'express';
import next from 'next';
import * as admin from 'firebase-admin';

admin.initializeApp();

const nextApp = next({
    dev: false,
    dir: '../.next',
});
const handle = nextApp.getRequestHandler();

export const nextjs = onRequest(
    {
        region: 'europe-west1',
        // You can also specify memory, concurrency, timeout seconds, etc.
    },
    (req: Request, res: Response) => {
        return nextApp.prepare().then(() => handle(req, res));
    }
);