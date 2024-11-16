import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const API_KEY = "3591f6cf"; // Replace with your OMDB API key.

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
      );
      setDetails(response.data);
    };
    fetchDetails();
  }, [movie, API_KEY]);

  if (!details) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{details.Title}</h2>
        <p>{details.Plot}</p>
        <p>
          <strong>Genre:</strong> {details.Genre}
        </p>
        <p>
          <strong>Ratings:</strong> {details.imdbRating}
        </p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
