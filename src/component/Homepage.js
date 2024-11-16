import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = "3591f6cf"; // Replace with your OMDB API key.

  // Fetch popular movies
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=batman&apikey=${API_KEY}` // Example query for popular movies
     
      );
      setMovies(response.data.Search || []);
    };
    fetchPopularMovies();
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!query) return;
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    );
    setMovies(response.data.Search || []);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );

};

export default HomePage;
