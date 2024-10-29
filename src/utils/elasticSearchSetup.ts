import { Client } from '@elastic/elasticsearch';
import { Movie } from '../types/movie';
import dotenv from 'dotenv';

dotenv.config();

const esClient = new Client({
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        apiKey: process.env.ELASTICSEARCH_API_KEY as string
    }
});


export async function initializeElasticSearch() {
    const exists = await esClient.indices.exists({ index: 'movies' });
    if (!exists) {
        await esClient.indices.create({
            index: 'movies',
            body: {
                mappings: {
                    properties: {
                        title: { type: 'text' },
                        year: { type: 'text' },
                        genre: { type: 'text' },
                        rating: { type: 'text' },
                    }
                }
            }
        });
    }
}

// export async function indexMoviesData(movies: Movie[]) {
//     for (const movie of movies) {
//         const exists = await esClient.exists({
//             index: 'movies',
//             id: movie.id 
//         });

//         if (!exists) {
//             await esClient.index({
//                 index: 'movies',
//                 id: movie.id,
//                 body: movie
//             });
//         } else {
//             console.log(`Movie with ID ${movie.id} already exists.`);
//         }
//     }
//     await esClient.indices.refresh({ index: 'movies' });
// }
export default esClient;
