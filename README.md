# Music API Endpoints

This is a set of API endpoints for a music application built using Express.js and Mongoose.

## Endpoints

### 1. Create a Music Entity

**Endpoint**: `POST /api/music`

**Description**: Creates a new music entity.

**Request Body**:
- `title` (required): The title of the music.
- `artist` (required): The artist of the music.
- `genre` (required): The genre of the music. Must be one of the following: `['rock', 'pop', 'hip-hop', 'classical', 'electronic']`.

**Response**:
- `201 Created`: The created music entity.
- `422 Unprocessable Entity`: If any of the required fields are missing or the genre is invalid.
- `500 Internal Server Error`: If an error occurs during the creation process.

### 2. Retrieve All Music Entities

**Endpoint**: `GET /api/music`

**Description**: Retrieves all music entities.

**Response**:
- `200 OK`: An array of all music entities.
- `500 Internal Server Error`: If an error occurs during the retrieval process.

### 3. Retrieve a Single Music Entity

**Endpoint**: `GET /api/music/:id`

**Description**: Retrieves a single music entity by its ID.

**Response**:
- `200 OK`: The requested music entity.
- `404 Not Found`: If the music entity is not found or the ID is invalid.
- `500 Internal Server Error`: If an error occurs during the retrieval process.

### 4. Update a Music Entity

**Endpoint**: `PATCH /api/music/:id`

**Description**: Updates a music entity by its ID.

**Request Body**:
- The fields to be updated (e.g., `title`, `artist`, `genre`).

**Response**:
- `201 Created`: The updated music entity.
- `404 Not Found`: If the music entity is not found.
- `422 Unprocessable Entity`: If the update fails.
- `500 Internal Server Error`: If an error occurs during the update process.

### 5. Delete a Music Entity

**Endpoint**: `DELETE /api/music/:id`

**Description**: Deletes a music entity by its ID.

**Response**:
- `200 OK`: A success message indicating that the music entity was deleted.
- `404 Not Found`: If the music entity is not found or the ID is invalid.
- `500 Internal Server Error`: If an error occurs during the deletion process.
