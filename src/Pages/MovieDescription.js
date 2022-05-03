import {React, useContext, useEffect, useState} from'react'

import Axios from '../axios'

import {fetchIdMovie} from "../requests"

import {useParams} from "react-router-dom"
import { toast } from 'react-toastify'

import {AiFillLike} from "react-icons/ai"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

import {AiOutlinePlus} from "react-icons/ai"

import "../assests/md.css"
import { UserContext } from '../Context/UserContext'
//https://image.tmdb.org/t/p/original/wXP0PlNJ9hDqZiywOYFPGO1sRZj.jpg
const MovieDescription = ()=>{
  const context = useContext(UserContext)
    const baseURL = "https://image.tmdb.org/t/p/original"
    const {id} = useParams()
    const {media} = useParams()
    const {title} = useParams()
   
    const [moviedetails, setMovieDetails] = useState([])
    const [showmore, setShowMore] = useState(false)
    const [trailerUrl, setTrailerUrl] = useState('')
    const fetchMovie =  async ()=>{
      try{
          
          const {data} = await Axios.get(fetchIdMovie(id,media,title))
        
          // handleclick(moviedetails)

          setMovieDetails(data)

      }catch(error){
          toast(error,{type: "error"})

      }
  }

    useEffect(()=>{
        
       
        fetchMovie()
       
    
    },[])
    useEffect(()=>{
      
        handleclick(moviedetails)
    },[moviedetails])

    console.table(moviedetails)

    const Changer = () =>{
      
        setShowMore(!showmore)
    }
    const opts={
        height: "480",
        width: "438%",
        playerVars:{
          autoplay:1,
        }
      }
    const handleclick=(movie)=>{
     
      if(trailerUrl){
        setTrailerUrl('')
      }else{
      
        movieTrailer(movie?.title ||movie?.name|| movie.original_title)
        .then((url)=>{
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'))
        })
        .catch((error)=> console.log(error))
        
      }
    
    };
    
  
   const trauncate = (str,n) =>{
       return str.substring(0,n)
   }
   const overview = (str,n)=>{
       return  str?.length>n ? (
           <div className='overview'>
           
              <p className='textfull'> { str.substring(0,n)}
                <span className='short'>{showmore ? (str.substring(n,str.length)):("")}</span>
                <span className='updater' onClick={Changer}>{showmore ? " less" : " More"}</span>
              </p>

           </div>
          
       ) : (
           <p className='overview'>{str}</p>
       )
   }
   const imgURL = baseURL+moviedetails?.backdrop_path
    return(
      <div className='movie_des'>
      <header className="image-banner">

      {trailerUrl?(<Youtube videoId={trailerUrl} opts={opts}/>):
    (<img
      src={`${imgURL}`}
        alt={moviedetails?.title}
        />
  

    )}

     
        </header>
      
        <h2 className="name">{moviedetails?.title || moviedetails?.name }</h2>
        
        <div className="details">
            <p>{moviedetails?.release_date ? trauncate(moviedetails.release_date,4):""}</p>
            <p className="certificate">{moviedetails?.adult? "A": "U/A"}</p>
            <p>{moviedetails?.runtime ? (moviedetails?.runtime+" Mins"):(moviedetails?.seasons? (moviedetails?.seasons.length+" seasons"): (""))}</p>
            <p><AiFillLike/> {moviedetails?.vote_count}</p>   
        </div>
                <button className="btn-list" onClick = {()=>{context.addMovie(moviedetails,context.user,title)}}><AiOutlinePlus/>My List</button>
                    <section className="overview-des">
                        {overview(moviedetails?.overview,50)}
                    </section>

                  
      </div>
      
    )
}

export default MovieDescription