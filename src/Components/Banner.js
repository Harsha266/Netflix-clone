import {React, useContext, useEffect, useState} from "react"
import { toast } from "react-toastify"

import {AiOutlinePlus,AiOutlineInfoCircle} from "react-icons/ai"
import {BsPlayFill} from "react-icons/bs"
import axios from "../axios"
import {requests} from "../requests"

import { v4  } from 'uuid';

import {Link,Navigate} from "react-router-dom"

import firebase from 'firebase/compat/app'
import { getDatabase, ref, set } from "firebase/database";
import { UserContext } from "../Context/UserContext"

const Banner= ()=>{
    const db= getDatabase()
    const [bannermovie, SetBannerMovie] = useState([])

    const context = useContext(UserContext)

    useEffect(()=>{
      
        const fetchBannerMovie=async () =>{
            try{
                const {data} =  await axios.get(requests.fetchTopRated)
                SetBannerMovie(
                    data.results[
                        Math.floor(Math.random()*data.results.length)])
                

            }catch(error){
                toast("Error",{type: "error"})

            }


        }
        fetchBannerMovie()

    },[])


    const baseURL = "https://image.tmdb.org/t/p/original"
    const trauncate = (str,n)=>
    {
        return str?.length>n ? str.substr(0,n-1)+"..." : str
    }

    

   

    return(
        <header className="banner"
        style={{
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original${bannermovie?.backdrop_path}"  
            )`,
            backgroundPosition:"center center",

        }}
        >
        
        <div className="banner-contents">
            <h1 className="name">{trauncate(bannermovie?.title,150)}</h1>
            <div className="banner-btns">
            <Link 
            to={`/MovieDescription/${bannermovie.hasOwnProperty("media_type")? bannermovie?.media_type: "movie"}/TopRated/${bannermovie?.id}`}>    
                <button><BsPlayFill fontsize="2rem"/>Play</button>
            </Link>
                
                <button onClick={()=>{context.addMovie(bannermovie,context.user,"TopRated")}}><AiOutlinePlus fontsize="2rem"/> My list</button>
                
                
            </div>
           
            <p className="banner_descriptions">{bannermovie?.overview}</p>
            
        </div>
        <div className="banner_fadebottom"></div>
        
        {console.table(bannermovie)}
       
        </header>
       
    )
}

export default Banner