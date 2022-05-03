import React ,{useContext, useEffect, useState}from 'react'

import { getDatabase, ref,query, child, get, orderByChild } from "firebase/database";
import { UserContext } from '../Context/UserContext';

import Row from '../Components/Row';
import Axios from '../axios'
import {requests,fetchIdMovie} from '../requests'

import { toast } from 'react-toastify';

import "../assests/row.css"

import Box from '../Components/Box'

const MyList = () => {




    const context = useContext(UserContext)
    
    const dbRef = getDatabase();
    const [mylist, setMylist] = useState([])
   // const [listdetails, setListDetails] = useState([])

    const getdetails = () =>{

    }
    const obj = null
    
    const getMovies =  async ()=>{
        const db = ref(getDatabase());
        get(child(db, `Mylist/${context.user?.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setMylist(snapshot.val())

            
            } else {
           toast("Nothing in your list",{type:"warning"})
            }
          }).catch((error) => {
            toast("Can't fetch from DB",{type:"error"})
          });
        


        }    
   
    useEffect(()=>{
        getMovies()
     


    },[context.user])
  
    if(Object.keys(mylist).length===0){
       return( <h1 className="title-list" >No movies in your list :( just add up to see here :)</h1>)
            
    }


    return(
     <div className="list">
     <h1 className="title-list">My List</h1>
        <div className="mylist box ">
      
      {Object.entries(mylist).map(([key,value])=>(
    
        <Box key={key} id={value.movieid} category={value.movietype} mediatype={value.mediatype}/>
          
         


        ))}
       
            

        </div>
        </div>
     


        
    )

}


export default MyList