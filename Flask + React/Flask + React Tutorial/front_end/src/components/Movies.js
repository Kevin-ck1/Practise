const Movies = ({movies}) => {
  return (
    <div>
        {movies.map((movie)=>(
            <h2 key={movie.id}>{movie.title} ({movie.ratings}) </h2>
        ))}
    </div>
  )
}

export default Movies