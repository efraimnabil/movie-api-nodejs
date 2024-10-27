# Movie API Project

### Overview

This project is a simple RESTful API for managing a collection of movies. It supports basic CRUD operations: fetching all movies, adding new movies, updating existing movies, and deleting movies. The API is built using Node.js and the Eframix framework.

### Features
- **GET**: Retrieve all movies or a specific movie by ID.
- **POST**: Add a new movie to the collection.
- **PUT**: Update an existing movie's details.
- **DELETE**: Remove a movie from the collection.

### Packages/Dependencies

This project uses the following packages:

- [**Eframix**](https://www.npmjs.com/package/eframix): A minimalistic framework for building web applications in Node.js.

### Endpoints

- **GET /api/movies**: Fetches all movies.
- **GET /api/movies/:id**: Fetches a specific movie by its ID.
- **POST /api/movies**: Adds a new movie. The request body must contain movie data in JSON format.
- **PUT /api/movies/:id**: Updates a specific movie by its ID. The request body must contain updated movie data.
- **DELETE /api/movies/:id**: Deletes a specific movie by its ID.

### Project Structure

- **src/**: Main source directory for the project.
  - **server.ts**: Main server file where the application starts.
  - **routes/**: Contains route handlers for movie-related endpoints.
    - **movieRoutes.ts**: Handles the logic for fetching, adding, updating, and deleting movies.
  - **types/**: Contains type definitions for the project.
    - **index.d.ts**: Extends the IncomingMessage interface to include a movies property.
  - **util/**: Directory containing utility functions.
    - **body-parser.ts**: Parses the incoming request body.
    - **write-to-file.ts**: Writes the updated movie list to a file.
  - **validators/**: Contains common validation functions.
    - **common.ts**: Provides validation logic for incoming requests.

## Movie API Documentation

### Base URL
The API's base URL is:

```bash
http://localhost:5000/api
```

### Endpoints

1. **GET /movies**

   * Fetches all the movies from the database.

   * **URL:** `/movies`
   * **Method:** `GET`
   * **Response:**
     - `200 OK`: Returns a list of movies.

   * **Example Response:**

     ```json
        [
            {
                "id": "213976be-9157-4daa-992b-5b93f68540a6",
                "title": "The Wolf of Wall Street",
                "year": "2013",
                "genre": "Biography, Comedy, Crime",
                "rating": "8.2"
            },
            {
                "title": "Avatar 2",
                "year": "2020",
                "genre": "Action, Adventure, Fantasy",
                "rating": "7.9",
                "id": "9017c8f4-3406-474a-a528-bac9da1675d8"
            }
        ]
     ```

2. **GET /movies/:id**

   * Fetches a specific movie by its ID.

   * **URL:** `/movies/:id`
   * **Method:** `GET`
   * **URL Parameter:**
     - `id` (string, required): The UUID of the movie you want to retrieve.
   * **Response:**
     - `200 OK`: Returns the movie with the specified ID.
     - `404 Not Found`: Returned when no movie is found with the provided ID.
     - `400 Bad Request`: Returned if the provided ID is not a valid UUID.

   * **Example Response (Success):**

     ```json
        {
            "title": "The Avengers: Infinity war",
            "year": "2020",
            "genre": "Action, Adventure, Fantasy",
            "rating": "7.9",
            "id": "3711087e-2863-427e-86d8-1548c3e7b0db"
        }
     ```

   * **Example Response (Not Found):**

     ```json
     {
       "title": "Not Found",
       "message": "Movie Not Found"
     }
     ```

3. **POST /movies**

   * Adds a new movie to the collection.

   * **URL:** `/movies`
   * **Method:** `POST`
   * **Request Body (required):**
     - The request body must contain the movie data in JSON format.

   * **Example Request Body:**

     ```json
        {
          "title": "Inception",
          "year": "2010",
          "genre": "Action, Adventure, Fantasy",
          "rating": "7.9"
        }
     ```

   * **Response:**
     - `201 Created`: Returns a success message with the created movie's ID.
     - `400 Bad Request`: Returned when the request body is invalid or missing required fields.

4. **PUT /movies/:id**

   * Updates an existing movie by its ID.

   * **URL:** `/movies/:id`
   * **Method:** `PUT`
   * **URL Parameter:**
     - `id` (string, required): The UUID of the movie you want to update.
   * **Request Body (required):**
     - The request body must contain the updated movie data in JSON format.

   * **Example Request Body:**

     ```json
        {
            "title": "Inception",
            "year": "2010",
            "genre": "Action, Adventure, Fantasy",
            "rating": "7.9"
        }
     ```

   * **Response:**
     - `200 OK`: Returns the updated movie.
     - `404 Not Found`: Returned when no movie is found with the provided ID.
     - `400 Bad Request`: Returned when the provided ID is not valid or the request body is invalid.

5. **DELETE /movies/:id**

   * Deletes a specific movie by its ID.

   * **URL:** `/movies/:id`
   * **Method:** `DELETE`
   * **URL Parameter:**
     - `id` (string, required): The UUID of the movie you want to delete.
   * **Response:**
     - `204 No Content`: Movie successfully deleted.
     - `404 Not Found`: Returned when no movie is found with the provided ID.
     - `400 Bad Request`: Returned if the provided ID is not valid.