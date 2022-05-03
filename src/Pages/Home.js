import {React, useContext,useEffect,useState} from'react'
import{Button} from "reactstrap"
import { UserContext } from '../Context/UserContext'

import Axios from 'axios'

import {toast} from "react-toastify"

import Row from "../Components/Row"
import Banner from '../Components/Banner'

import {requests} from "../requests"

const Home = ()=>{
  

    return(
      <div className='context'>
      <Banner/>
      <div className='rows'>
      
       <Row title="Trending" fetchurl = {requests.fetchTrending}/>
        <Row title="NetFlix Originals" isLargeRow={true} fetchurl={requests.fetchNetflixOriginals}/>
        <Row title="Top Rated" fetchurl={requests.fetchTopRated}/>
        <Row title="Comedy" fetchurl={requests.fetchComedyMovies}/>
        <Row title="Action" fetchurl={requests.fetchActionMovies}/>
        <Row title="Horror" fetchurl={requests.fetchHorrorMovies}/>
        <Row title="Romance" fetchurl={requests.fetchRomanceMovies}/>
        <Row title="Documentaries" fetchurl={requests.fetchDocumantaries}/>
        </div>
      </div>
     // <h1>home</h1>

      
    )
}

export default Home