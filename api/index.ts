import serverless from 'serverless-http';
import app from '../src/index';

const handler = serverless(app);

export default async (req: any, res: any) => {
    // Read original requested path from Vercel headers or url
    if (req.headers && req.headers['x-matched-path']) {
        req.url = req.headers['x-matched-path'];
    }
    
    return handler(req, res);
};
