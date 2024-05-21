import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

export default function Navbar({loggedIn, setLoggedIn, setSignup, signup, setBool1, Bool1,setUsername}) {
    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
        setLoggedIn(false);
    }
    const [display,setDisplay] = useState(false)
    const [scrolly, setScrolly] = useState(0)

    window.addEventListener('scroll', () => {
        setScrolly(window.scrollY)
    })

    document.addEventListener('click', (e) => {
        if(location.pathname !== '/about' && e.target.className !== 'nav-profile' && !e.target.className.includes('login')){
            setDisplay(false)
        }
    });
    return(
        <>
            <div className="navbar">
                <div className="logo">
                    {
                        scrolly > 5 &&
                        <h1>Gallery</h1>
                    }
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/about">About</Link>
                        </li>
                        <li>
                        <Link to={loggedIn?"/gallery":"/"} onClick={()=>{
                            if(!loggedIn){
                                alert('Please Login First')
                            }
                        }}>Gallery</Link>
                        </li>
                        <li>
                        <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className='nav-profile' onClick={()=>{
                    setDisplay(!display)
                }}>
                    <ul style={{display:display?'block':'none'}}>
                        {
                            !loggedIn &&
                            <>
                                <li>
                                    <button className='login' onClick={()=>{setSignup(false); setBool1(!signup?!Bool1:true)}}>Login</button>
                                </li>
                                <li>
                                    <button className='login' onClick={()=>{setSignup(true); setBool1(signup?!Bool1:true)}}>Sign UP</button>
                                </li>
                            </>
                        }
                        {
                            loggedIn &&
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}