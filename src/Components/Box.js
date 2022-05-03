import {React, useEffect, useState} from "react"

import Axios  from "../axios"

import "../assests/row.css"
import { fetchIdMovie } from "../requests"

import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const baseURL = "https://image.tmdb.org/t/p/original"


const Box = ({id,category, mediatype}) =>{

    const [Allmovie,setAllMovie] = useState([])
const fetchAllmovie = async ()=>{
    try{
        const {data} = await Axios.get(fetchIdMovie(id,mediatype,category))
        setAllMovie(...Allmovie,data)
        

    }catch(error){
        toast("Can't fetch movie from the TMDB",{type:"error"})
    }
}


    useEffect(()=>{
        fetchAllmovie(id,category,mediatype)


    },[id,category,mediatype])

    

    return(
    <>
    {
        <Link
        key={Allmovie.id}
        to={`/MovieDescription/${Allmovie.hasOwnProperty("seasons")? "tv": "movie"}/${category.replaceAll(" ","")}/${Allmovie.id}`}
        className=  "poster"
        
        >
        <img 
        // onClick={()=>handleclick(movie)}
         
        
        alt={Allmovie.name}  
        src={`${baseURL}${Allmovie.backdrop_path }`}
        />
        </Link>
    
    
    
    }
       
       
    </>
    
    )
}
export default Box