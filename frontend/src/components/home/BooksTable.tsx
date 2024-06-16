import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiFillStar, AiOutlineSearch } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

interface Props {
  books: {
    id: any;
    title: string;
    author: string;
    publication_date: string;
    genre: string;
    rating: number;
  }[];
}

const BooksTable: React.FC<Props> = ({ books }) => {
  // State for search input
  const [searchInput, setSearchInput] = useState<string>("");

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Filter books by author based on search input
  const filteredBooks = books.filter((book) =>
    book.author.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Sort books by publication date in descending order
  const sortedBooks = filteredBooks.sort((a, b) => {
    return new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime();
  });

  // Function to generate star icons based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AiFillStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
          <input
            type="text"
            placeholder="Search by author"
            value={searchInput}
            onChange={handleSearchChange}
            className="px-2 py-1 outline-none"
          />
          <AiOutlineSearch className="text-2xl text-gray-500" />
        </div>
      </div>
      {sortedBooks.length > 0 ? (
        <table className="w-full border-separate border-spacing-2 table-fixed">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md">Author</th>
              <th className="border border-slate-600 rounded-md">Publication Date</th>
              <th className="border border-slate-600 rounded-md">Genre</th>
              <th className="border border-slate-600 rounded-md">Rating</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book, index) => (
              <tr key={book.id} className="h-8 hover:bg-gray-100">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {new Date(book.publication_date).toLocaleDateString()}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.genre}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center">
                    {renderStars(book.rating)}
                  </div>
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book.id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book.id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book.id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No books found</div>
      )}
    </div>
  );
};

export default BooksTable;
