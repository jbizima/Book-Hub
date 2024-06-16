import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { format , parseISO, isValid} from 'date-fns';


interface Book {
    id: any;
  title: string;
  author: string;
  publication_date: string;
  genre: string;
  rating: number;
}


const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    publication_date: "",
    genre: "",
    rating: 0,
  });


  const [loading, setLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>([]);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:7080/api/books/${id}`)
      .then((response) => {
        const bookData = response.data;
        if (isValid(parseISO(bookData.publication_date))) {
            bookData.publication_date = format(parseISO(bookData.publication_date), 'yyyy-MM-dd');
          }
        setBook(bookData);
        
        setLoading(false);

      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Error fetching book", { variant: "error" });
        setLoading(false);
      });
      // Fetch genres from your API or set predefined genres
    const fetchedGenres = ["Fiction", "Non-Fiction", "Science Fiction", "Biography", "Romance", "Academic", "Thriller"];
    setGenres(fetchedGenres);
  }, [id, enqueueSnackbar]);


  const handleEditBook = () => {

    setLoading(true);
    axios
      .put(`http://localhost:7080/api/books/${id}`, book)
      .then(() => {
        setLoading(false);
        
        enqueueSnackbar("Book edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Error editing book", { variant: "error" });
        setLoading(false);
      });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    const { name, value } = e.target;

    // If the name is 'rating', ensure value is within 0 to 5
    if (name === 'rating') {
      let ratingValue = Number(value);
      ratingValue = Math.min(Math.max(ratingValue, 0), 5); // Clamp rating between 0 and 5
      setBook((prevBook) => ({
        ...prevBook,
        [name]: ratingValue,
      }));
    } else {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    }
  };


  if (loading) return <Spinner />;
  


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="date"
            name="publication_date"
            value={book.publication_date}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Genre</label>
          <select
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Rating</label>
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            min="0" // Set minimum value
            max="5" // Set maximum value
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};


export default EditBook;