import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai"

const apikey = "8a598fda385a0d6190ae2c45ad4eb3b0";
const url = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
);

const Row = ({ title, arr = [] }) => (
  <div className='row'>
    <h2>{title}</h2>

    <div>
      {
        arr.map((item, index) => (
          <Card img={`${imgUrl}/${item.poster_path}`} key={index} />
        ))
      }
    </div>
  </div>
);
const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}&page=15`);
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}&page=1`);
      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      setTopRatedMovies(results);
    };

    const getAllGenres = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenres(genres);
    };

    getAllGenres();

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();

  }, []);

  return (
    <section className='home'>
      <div className="banner" style={
        {
          backgroundImage: nowPlayingMovies[0] ? `url(${imgUrl}/${nowPlayingMovies[0].poster_path})` : 'rgb(16, 16, 16)' }}>
        {nowPlayingMovies[0] && (<h1>{nowPlayingMovies[0].original_title}</h1> )}
        {nowPlayingMovies[0] &&(<p>{nowPlayingMovies[0].overview}</p>)}

        <div>
        <button> <BiPlay/> Play</button>
        <button>My List <AiOutlinePlus/> </button>
        </div>
      </div>

      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="genrebox">
        {genres.map((genre) => (
          <Link key={genre.id} to={`/genre/${genre.id}`}>
            {genre.name} {/* Display the genre name */}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Home;
