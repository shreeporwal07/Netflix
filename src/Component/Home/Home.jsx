import React from 'react'
import "./Home.scss"
import axios from 'axios'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai';
import {BiPlay} from 'react-icons/bi';

const apikey="81087fc5445c190fd68af7293546a5bc";
const url="https://api.themoviedb.org/3";
const upcoming= "upcoming";
const popular="popular";
const nowplaying="now_playing";
const toprated= "top_rated";
const imgurl="https://image.tmdb.org/t/p/original";

const Card = ({ img }) => {
  return (
  <img className="card" src={img} alt="cover" />
  )
}
const Row=({title,arr=[{
  img:"https://buzz.tt/media/posters/2384/posters_4_1500.jpg"
}]})=>{
  return(
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item,index)=>(
          <Card key={index} img={`${imgurl}/${item.poster_path}`}/>
        ))
      }
    </div>
  </div>
  )
}

const Home = () => {

  const [upcomingMovies,setUpcomingMovies]=useState([]);
  const [TRMovies,setTRMovies]=useState([]);
  const [PMovies,setPMovies]=useState([]);
  const [NPMovies,setNPMovies]=useState([]);
  const [genre,setgenre]=useState([]);

  useEffect(() => {
    const fetchUpcoming=async()=>{
        const { data: {results} }= await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
        setUpcomingMovies(results)
    };
    const fetchPopular=async()=>{
        const { data: {results} }= await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
        setPMovies(results)
    };
    const fetchTR=async()=>{
      const { data: {results} }= await axios.get(`${url}/movie/${toprated}?api_key=${apikey}`);
      setTRMovies(results)
    };
    const fetchNP=async()=>{
      const { data: {results} }= await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}`);
      setNPMovies(results)
    };
    const getAllgenre=async()=>{
      const { data: {genres} }= await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setgenre(genres)
    };
  
    return () => {
      fetchNP();
      fetchPopular();
      fetchTR();
      fetchUpcoming();
      getAllgenre();
    }
  }, [])

  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage:PMovies[0]?`url(${`${imgurl}/${PMovies[0].poster_path}`})`:"rgb(16,16,16)"
      }}>
        {
          PMovies[0] && <h1> {PMovies[0].original_title}</h1>
        }
        {
          PMovies[0] && <p> {PMovies[0].overview}</p>
        }
        <div>
        <button><BiPlay/>Play</button>
        <button>My List <AiOutlinePlus/></button></div>
      </div>
      <Row title={"Now Playing"} arr={NPMovies}/>
      <Row title={"Top Rated"} arr={TRMovies}/>
      <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
      <Row title={"Popular on Netflix"} arr={PMovies}/>
      <div className="genreBox">
        {genre.map((item)=>(
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section>
  )
}

export default Home