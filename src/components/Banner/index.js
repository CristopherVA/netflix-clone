import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import requests from '../../api/requests'
import './Banner.css'

export const Banner = () => {

    const [movie, setMovie] = useState([])

    useEffect(() => {

        async function fetchData() {

            const request = await axios.get(requests.fetchNetflixOriginals)
   
            const resp =  request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]

            setMovie(resp)

            return request
        }

        fetchData();

    }, [])

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className='header'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                backgroundPosition: "center center  ",
            }}
        >
            <div className="banner__contents">
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>

                <div className="banner__description">{truncate(movie?.overview, 150)}</div>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}
