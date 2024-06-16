import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";


// Define Params type with index signature
interface Params {
  id: string;
  [key: string]: string | undefined;
}


const DeleteBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // Use Params with the updated type
  const { id } = useParams<Params>();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    console.log("Book ID from URL params:", id);
  }, [id]);


  const handleDeleteBook = () => {
    if (!id) {
      enqueueSnackbar("Invalid Book ID", { variant: "error" });
      return;
    }


    setLoading(true);
    axios
      .delete(`http://localhost:7080/api/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book", { variant: "error" });
        console.error("Delete error:", error);
      });
  };


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure?</h3>
        <button className="p-4 bg-red-600" onClick={handleDeleteBook}>
          Yes
        </button>
      </div>
    </div>
  );
};


export default DeleteBook;