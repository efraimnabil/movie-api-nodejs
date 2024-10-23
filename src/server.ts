import * as dotenv from 'dotenv';
import Router from './core/Router';
import getRoutes from './methods/get-request';
import postRoutes from './methods/post-request';
import putRoutes from './methods/put-request';
import deleteRoutes from './methods/delete-request';
import bodyParser from './util/body-parser';
import moviesData from '../data/movies.json';

dotenv.config();

const PORT = process.env.PORT || 5001;

const router = new Router([getRoutes, postRoutes, deleteRoutes, putRoutes]);

router.addMiddleware(bodyParser);

router.startServer(Number(PORT), moviesData);
