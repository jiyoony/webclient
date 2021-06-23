import React, { useState, useCallback } from 'react';
import Movie from './Movie';


const Hell = ( {movies} ) => {
  const [state, setState] = useState([
    { key: '' }
  ]);

  const handleButton = useCallback(
    e => {
      console.log(movies[e.target.value-1]);
      setState(
        state.map( a =>
          a = { key: movies[e.target.value-1].link}
        )
      );
      e.preventDefault();
    },
  );

  if (movies.length>10) {
    movies = movies.slice(0, 10);
  }

  const button_nums = Array();
  for (let i=1; i<=movies.length; i++) {
    button_nums.push(i);
  }

  const [sort_by,count] = search.split(" ")
  ytsApi.search({
    sort_by:sort_by,
    order_by:'desc',
    limit:count
  }).then(({data})=>{
    const {movies} =data.data
    this.setState({movies,isLoading:false});
  })

  {movies.map((movie,index)=>(
    <Movie key={index} movie={movie} handler={()=>this.setState({info:movie})}
    />
  ))}

  

  return (
    <div className="result">
        {/* <div className="for_button" onClick={handleButton}>
        {button_nums.map(num => (<input type="button" value={num}/>))}
      </div>
     {movies.map(movie => (<Movie state={state} id={movie.link} year={movie.pubDate} title={movie.title} poster={movie.image} rating={movie.userRating} director={movie.director} actor={movie.actor}/>))}  */}
    </div>
  );
}

export default Hell;