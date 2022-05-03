import {React,useState, useEffect} from 'react'
import Axios from '../axios'

import "../assests/row.css"

// import Youtube from "react-youtube"
// import movieTrailer from "movie-trailer"

import {toast} from "react-toastify"


import {Link} from "react-router-dom"

import Image from 'react-bootstrap/Image'

const baseURL = "https://image.tmdb.org/t/p/original"


const Row =({title, fetchurl, isLargeRow})=> {
const [movies, setMovies] = useState([])
const fetchMovies = async () =>{
  try{
    const {data} = await  Axios.get(fetchurl)
    setMovies(data.results)
  //  console.table(data.results)

  }catch(error){
    toast("Try after some time" ,{type: "error"})

  }
}

  
  useEffect(()=>{
   
    fetchMovies()

  },[fetchurl])


  console.table(movies)
  
  
  return (
    <div className='pt-2'>
        {/* title*/}
        <h2 className='ps-5'>{title}</h2>
        <div className='box'>
        {
         
          movies.map(movie=>(
            // console.log(? true:false)
            <Link
            key={movie.id}
            to={`/MovieDescription/${movie.hasOwnProperty("media_type")? movie.media_type: "movie"}/${title.replaceAll(" ","")}/${movie.id}`}
            className= {isLargeRow? "poster_large" : "poster"}
            
            >
            <img 
            // onClick={()=>handleclick(movie)}
             
            
            alt={movie.name}  
            src={`${baseURL}${isLargeRow? movie.poster_path: movie.backdrop_path }`}
            />
            </Link>
          ))
      }
        </div>
        

    </div>
  )
}

export default Row

//