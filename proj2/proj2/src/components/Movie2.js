import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ movie, handler }) {
   const img_url = `http://movie-app-20191313.herokuapp.com/img-yts/assets/images/movies/${movie.slug.replace(
      /-/gi,
      "_"
   )}/medium-cover.jpg`;

   return (
      <div
         style={{
            flex: 1,
            height: 150,
            backgroundPosition: "left",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${img_url})`
         }}
      onClick={() => handler(movie)}
      />
   );

}

Movie.propTypes = {
   movie: PropTypes.any,
   handler: PropTypes.any,
};

export default Movie;