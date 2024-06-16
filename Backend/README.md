
# Backend Project Name

Brief description of the backend project. Include what the project does, its purpose, and any other relevant information.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [GET /api/books](#get-apibooks)
  - [GET /api/books/:id](#get-apibooksid)
  - [POST /api/books](#post-apibooks)
  - [PUT /api/books/:id](#put-apibooksid)
  - [DELETE /api/books/:id](#delete-apibooksid)


## Technologies Used

Main technologies and libraries used in the backend project.

- Node.js
- Express.js
- MySQL (mysql2 package)
- Cors
- Body-parser

## Getting Started

Provide instructions on setting up the development environment and running the backend server locally.

### Prerequisites

Software dependencies or tools that need to be installed before setting up the project.

- Node.js
- MySQL server

### Installation

Clone the repository and install the required npm packages.

```
git clone <https://github.com/jbizima/Book-Hub.git>
cd Backend
npm install
```



### Running the Server

Start the backend server locally.

```
npm start
```

The server will start on port 7080 by default. You can access it at \`http://localhost:7080\`.

## API Endpoints

Document the API endpoints provided by your backend server.

### GET /api/books

Fetches all books from the database. Supports optional query parameter \`genre\` for genre filtering.

### GET /api/books/:id

Fetches a single book by ID from the database.

### POST /api/books

Creates a new book entry in the database.

### PUT /api/books/:id

Updates an existing book entry in the database based on the provided ID.

### DELETE /api/books/:id

Deletes a book from the database based on the provided ID.


