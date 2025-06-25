import { useEffect, useState } from "react"
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  useDebounce(() => setDebounceSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

  try {
      //throw new Error("Failed to fetch movies");
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if(data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results || []);

      console.log(data);
  } catch (error) {
    console.error(`Error fetching movie: ${error}`);
    setErrorMessage("Error fetching movies. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchMovies(debounceSearchTerm);
}, [debounceSearchTerm]);

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="" />
          <h1>Find <span className="text-purple-500">Movies!
            <br/>
            </span> Hit Play <span className="text-gradient">Feel everything</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {
            isLoading ?
              <Spinner/>
            :
              (
                <ul>
                  {
                    movieList.map((movie) => (
                      <MovieCard key={movie.id} movie={movie}/>
                    ))
                  }
                </ul>
              )
          }
      
        {errorMessage && <p className="text-red-500">{errorMessage}</p> }
        </section>
      </div>
    </main>
  );
}

export default App