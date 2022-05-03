import React,{useContext} from 'react'

import { UserContext } from '../Context/UserContext'

import avatar from '../assests/avatar.png'

import '../assests/about.css'

const About = () => {
     const context = useContext(UserContext)
     console.table(context.user)
    return(
        {/* */},
        <>
        <div className='about'>
            <div >
            <img className='about_img'
            src={`${(context.user?.providerData[0]?.photoURL) ?(context.user?.providerData[0]?.photoURL) :(avatar)}`}
            alt="avatar"/>

            
            </div>
            <h2>{context.user?.email}</h2>
            <div>
           
            </div>
          
        </div>
        <footer className="footer">copy rights owned by harsha</footer>
        </>


    )
}


export default About