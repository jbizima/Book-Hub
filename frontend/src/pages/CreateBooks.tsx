import React, { useState, ChangeEvent } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publication_date, setPublicationDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // List of predefined genres
  const genres = ["Fiction", "Non-Fiction", "Science Fiction", "Biography", "Romance", "Academic", "Thriller"];


  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publication_date,
      genre,
      rating,
    };
    setLoading(true);
    axios
      .post("http://localhost:7080/api/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  // Function to handle rating input change
  const handleRatingChange = (e:  ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    // Ensure value is within the range of 0 to 5
    if (value < 0) {
      value = 0;
    } else if (value > 5) {
      value = 5;
    }
    setRating(value);
  };

  // Function to handle genre selection change
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value); // Update the genre state with the selected value
  };


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publication Date</label>
          <input
            type="date"
            value={publication_date}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Genre</label>
          <select
            value={genre}
            onChange={handleGenreChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
          <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={handleRatingChange}
            min="0" // Set minimum value
            max="5" // Set maximum value
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save Book
        </button>
      </div>
    </div>
  );
};


export default CreateBooks;