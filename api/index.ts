import serverless from 'serverless-http';
import app from '../src/index';

const handler = serverless(app);

export default async (req: any, res: any) => {
    // Read the original request path from req.url or req.query
    if (req.url) {
        // Handle rewrites formatted as /api/index?path=/v1/movies/550
        const queryIndex = req.url.indexOf('?path=');
        if (queryIndex !== -1) {
            const extractedPath = req.url.substring(queryIndex + 6);
            req.url = '/' + decodeURIComponent(extractedPath).replace(/^\/+/, '');
        }
    }
    
    return handler(req, res);
};
