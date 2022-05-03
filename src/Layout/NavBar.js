import {React, useContext, useEffect, useState} from "react"
import{
    Navbar,
    Nav, NavItem,NavLink,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Dropdown, DropdownItem,
    DropdownMenu, DropdownToggle


    
} from 'reactstrap'

import {Link} from "react-router-dom"

import firebase from "firebase/compat/app"

import {UserContext} from "../Context/UserContext"
import { toast } from "react-toastify"


import {TiPowerOutline} from "react-icons/ti"


const NavBar = () =>{

    const context = useContext(UserContext)


    const [isOpen, setIsOpen] = useState(false)
    const [isdrop, setIsDrop] = useState(false)
    const [show, setShow] = useState(false)

    const togglerdrop = () => setIsDrop(!isdrop)

    const toggler =() => setIsOpen(!isOpen)


    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            var singin = document.getElementById("singin")
            var signup = document.getElementById("singup")
            if(window.scrollY>100){
                setShow(true)
                singin.style["color"] = "white"
                signup.style["color"] = "white"
              

            }else{setShow(false)
                
            }
        })
        return ()=>{
            window.removeEventListener("scroll")
        }

    },[])


    return(
        <div className={`topbar ${show && "blackbar"}`}>
        
        <Navbar  light expand='md'>
       
       { /*NavBrand make a branding for the logo>*/}
        <NavbarBrand>
            <Link to='/' className="text-danger text-decoration-none">
                <img height="50" width="100" className = "ml-5" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"/>
                
            </Link>
        </NavbarBrand>
        <NavbarToggler  className="text-white" onClick={toggler}/>
        <Collapse navbar isOpen={isOpen}>
        
       
        
            <Nav navbar className="ms-auto">
            {
                //TODO: provide a power button which contais detail like about
                context.user?.email ? (
                <NavItem>
                {/*<NavLink tag={Link}  className="text-white"><TiPowerOutline size={30} /></NavLink>*/}
                  
                    <Dropdown isOpen={isdrop} toggle={togglerdrop}>
                        <DropdownToggle caret>
                       
                            <TiPowerOutline size={30} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag={Link} to={context.user?("/mylist"):("/SignIn")}>My list</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem tag={Link} to="/about">About</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem tag={Link} onClick={
                                ()=>{
                                    context.SetUser(null)
                                    firebase
                                    .auth()
                                    .signOut().then(()=>{
                                       // localStorage.setItem("user",context.user)
                                        toast("Successfully SignedOut",{type:"Success"})
                                    }).catch(error=>{
                                        toast("An error occured try after sometime",{type:"error"})
        
                                    })
        
                                }
                            }to="/SignIn" >Log Out</DropdownItem>
                        </DropdownMenu>

                    </Dropdown>





                </NavItem>
                ):(
                <>
                    <NavItem>
                        <NavLink tag={Link} id="singin" to="/SignIn"  style={{color: "black"}}>Sign In</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={Link} id="singup"  to="/SignUp" style={{color: "black"}}>Sign Up</NavLink>
                    </NavItem>
                </>
                )
            }
               

                
            </Nav>
        </Collapse>
        </Navbar>
    </div>
    )

}

export default NavBar
