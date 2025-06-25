import { useEffect, useState } from "react"
import Search from "./components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async () => {
  try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      console.log(data);
  } catch (error) {
    console.log(`Error fetching movie: ${error}`);
  }
};

useEffect(() => {
  fetchMovies();
}, []);
  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="" />
          <h1>Find <span className="text-purple-500">Movies!</span> Hit Play <span className="text-gradient">Feel everything</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
      </div>
    </main>
  )  
}
export default App
