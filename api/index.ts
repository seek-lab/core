import serverless from 'serverless-http';
import app from '../src/index';

const handler = serverless(app);

export default async (req: any, res: any) => {
    if (req.url) {
        const queryIndex = req.url.indexOf('?path=');
        if (queryIndex !== -1) {
            // Cut right after "?path="
            const rawPath = req.url.split('?path=')[1];
            // Decode and strip any leading slashes/equals
            const cleanedPath = decodeURIComponent(rawPath).replace(/^[=/]+/, '');
            req.url = '/' + cleanedPath;
        }
    }
    
    return handler(req, res);
};
