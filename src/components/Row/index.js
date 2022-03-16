import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")

   
    
    useEffect(() => {

        async function fetchData () {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }

        fetchData()
    }, [fetchUrl])

    const opts = {  
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay:1,
        },
      };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("")
        }else {
            movieTrailer(movie?.name || movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).searchParams)
                    setTrailerUrl(urlParams.get("v"));
                }).catch((err) => console.log(err))
        }
    }


  return (
    <div className='row' >
        {/* TITLE */}
        <h2>{ title }</h2>

        <div className="row__posters">
            { movies.map( movie => (
                <img 
                    onClick={() => handleClick(movie)}
                    key={movie.id}
                    className={ `row__poster ${ isLargeRow && 'row__posterLarge'}`  } 
                    src={`${base_url}${movie.poster_path}`} alt={movie.name}
                />
            ))} 
        </div>
        { trailerUrl &&  <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}
