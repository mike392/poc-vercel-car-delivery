import path from "node:path";

const functions = require('firebase-functions');
const next = require('next');
// import { NextApiRequest, NextApiResponse } from "next";
// import next from "next";
import { Request, Response } from "express";

// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
admin.initializeApp();

const nextApp = next({
    dev: false,  // Change to `true` for development
    dir: path.join(__dirname, '../'),   // The directory of your Next.js app
});

const handle = nextApp.getRequestHandler();

exports.nextjs = functions.https.onRequest((req: Request, res: Response) => {
    return nextApp.prepare().then(() => {
        handle(req, res);
    });
});