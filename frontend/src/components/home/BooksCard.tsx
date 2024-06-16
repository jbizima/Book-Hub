
// src/components/home/BooksCard.tsx
import React from 'react';
import BookSingleCard from './BookSingleCard';


interface Book {
  id: string;
  title: string;
  author: string;
  publication_date: string;
  genre: string;
  rating: number;
}


interface Props {
  books: Book[];
}


const BooksCard: React.FC<Props> = ({ books }) => {
  // Sort books by rating in descending order
  const sortedBooks = books.sort((a, b) => b.rating - a.rating);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedBooks.map((book) => (
        <BookSingleCard key={book.id} book={book} />
      ))}
    </div>
  );
};


export default BooksCard;


// Add empty export statement to treat as module
export {};