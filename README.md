# Book Hub: A React Discovery App

## Project Overview

Book Hub is a web application designed for discovering books. The project utilizes React with TypeScript for the frontend to create an interactive and user-friendly interface, and a Node.js backend API to manage book data. 

## Project Goals

1. Develop a user-friendly interface for browsing books.
2. Implement functionalities for filtering and searching books by genre, author, publication date, etc.
3. Utilize React and TypeScript to build a responsive and interactive frontend.
4. Design a backend API to handle book data storage and retrieval.
5. Integrate the frontend and backend for a seamless user experience.



## Getting Started

### Technologies Used

![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23007ACC.svg?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine for server-side applications.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **MySQL:** Open-source relational database management system.
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite:** Fast frontend tooling for modern web development, focusing on speed and extensibility.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development, providing a consistent design system.

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/jbizima/Book-Hub.git
    ```

2. **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3. **Backend Setup**
    ```bash
    cd backend
    npm install
    npm start
    ```

### Usage

- **Frontend**: Access the frontend application at `http://localhost:5173`.
- **Backend**: The backend API will be available at `http://localhost:7080`.

### API Endpoints

- **GET /api/books**: Fetch all books
- **GET /api/books/:id**: Fetch a book by ID
- **POST /api/books**: Create a new book
- **PUT /api/books/:id**: Update a book by ID
- **DELETE /api/books/:id**: Delete a book by ID

### Frontend Components

- **BookList**: Displays a list of books.
- **BookDetail**: Shows details of a selected book.
- **SearchBar**: Allows searching books by author.
- **Filters**: Enables filtering books by genre.
- **SortingOptions**: Allows sorting books by date or rating.

### State Management

- Use Redux or Context API to manage the state of the application, including the list of books, selected book details, and applied filters.

### Future Enhancements

- **User Accounts**: Implement user authentication and authorization.


