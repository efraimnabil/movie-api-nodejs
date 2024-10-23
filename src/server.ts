import * as http from 'http';
import * as dotenv from 'dotenv';
import { IncomingMessage, ServerResponse } from 'http';
import getRoutes from './methods/get-request';
import postRoutes from './methods/post-request';
import putRoutes from './methods/put-request';
import deleteRoutes from './methods/delete-request';
import Router from './core/Router';
import moviesData from '../data/movies.json';
import bodyParser from './util/body-parser';

dotenv.config();

const PORT = process.env.PORT || 5001;
const router = new Router([getRoutes, postRoutes, deleteRoutes, putRoutes]);

router.addMiddleware(bodyParser);

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    req.movies = moviesData;  
    req.params = {};         
    await router.use(req, res);
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
