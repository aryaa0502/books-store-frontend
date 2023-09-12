import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://books-store-backend-l8ec.onrender.com")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-2">
        
        <input
          id="toggle-on"
          class="toggle toggle-left"
          name="toggle"
          value="false"
          type="radio"
          checked
          onClick={() => setShowType("table")}
        />
        <label for="toggle-on" class="btn" title="Click for table view of books">
          Table View
        </label>
        <input
          id="toggle-off"
          class="toggle toggle-right"
          name="toggle"
          value="true"
          type="radio"
          onClick={() => setShowType("card")}
        />
        <label for="toggle-off" class="btn" title="Click for card view of books">
          Card View
        </label>
        {/* <button
          className='bg-sky-600 hover:bg-sky-300 px-4 py-1 rounded-lg mx-0'
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mx-0'
          onClick={() => setShowType('card')}
        >
          Card View
        </button> */}
      </div>
      <div className="flex justify-between items-center">
        <h1 style={{fontFamily: 'Titillium Web'}}  className="text-4xl my-8 mx-2">Library Books List</h1>
        <Link to="/books/create" title="Add new book">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
