import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
//import { Link } from 'react-router-dom';


interface Book {
  id: string;
  title: string;
  author: string;
  publication_date: string;
  genre: string;
  rating: number;
}


const ShowBook: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();


  useEffect(() => {
    console.log("Book ID from URL params:", id); // Debugging line


    if (!id) {
      console.error("No ID provided");
      return;
    }


    setLoading(true);
    axios
      .get(`http://localhost:7080/api/books/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setBook(response.data);
        } else {
          console.error(`Error fetching book: ${response.status}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        setLoading(false);
      });
  }, [id]);


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book.id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publication Date</span>
            <span>{new Date(book.publication_date).toLocaleDateString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Genre</span>
            <span>{book.genre}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Rating</span>
            <span>{book.rating}</span>
          </div>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};


export default ShowBook;
