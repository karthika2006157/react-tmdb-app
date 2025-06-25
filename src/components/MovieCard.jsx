import React from 'react'

const MovieCard = ({movie: { title, vote_average, poster_path, release_date, original_language}}) => {
  return (
    <div className="movie-card">
        <img src={
            poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/no-movie.png'
        } alt="" />
        <div className="mt-4">
            <h3>{title}</h3>
        </div>
        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                <span></span>
            </div>
        </div>
        <p className="text-white">{title}</p>
    </div>
  )
}

export default MovieCard