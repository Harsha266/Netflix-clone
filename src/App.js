
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import { v4  } from 'uuid';
import firebase from 'firebase/compat/app'
import { getDatabase, ref, set } from "firebase/database";

//import useState, useContext
import {useState, useContext, React, useEffect}  from 'react'
//importing layouts
import NavBar from './Layout/NavBar';

//importing componenets
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import MovieDescription from './Pages/MovieDescription';
import PageNotFound from './Pages/PageNotFound'
import MyList from './Pages/MyList'
import About from './Pages/About'

//importing our context
import {UserContext} from "./Context/UserContext"


//importng  bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

//importing fireabse pacakges firebase

import "firebase/compat/auth";

import "./App.css"
//importing firebase config
import firebaseconfig from "./Config/Firebase"
import { List } from 'reactstrap';
//initalization of firebase
firebase.initializeApp(firebaseconfig)




function App() {
  const db= getDatabase()
  const context = useContext(UserContext)

  const [user, SetUser] = useState(null)

 // const [count,SetCount] = useState(0)
  
  
  useEffect(() =>{
    const localuser = localStorage.getItem("user")
  
    if(localuser){
      const foundUser = localuser
    
     
      SetUser(JSON.parse(foundUser))
      
    }


  },[])


  useEffect(()=>{

  localStorage.setItem("user",JSON.stringify(user))
  },[user])

  const addMovie = async(movie,user,category) =>{
       // toast("clcicker",{type:"errro"})
       if(user){
        try{
           

            set(ref(db,`Mylist/${user?.uid}/`+v4()),{
                userid: user?.uid,
                mediatype: movie.hasOwnProperty("seasons")? "tv": "movie",
                movieid: movie?.id,
                moviename: movie?.name || movie?.title ||movie?.original_title,
                movietype: category

            })
            toast("Added to Mylist",{type:"success"})

        }catch(error){
          toast("Error in adding to the list try later",{type:"error"})
        }
      }else{
        toast("login first",{type: "error"})
      }
    }

  return (
    <Router>
    <UserContext.Provider value={{user,SetUser,addMovie}}>
    <ToastContainer/>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          <Route path='/MovieDescription/:media/:title/:id' element={<MovieDescription/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/mylist' element={<MyList/>}/>
        </Routes>
      </UserContext.Provider>
    </Router>
    

 
  );
}

export default App;
