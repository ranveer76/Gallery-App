import React,{useState} from 'react'
import './header.css'

export default function Header() {
    const [scroll, setScroll] = useState(0)

    window.addEventListener('scroll', () => {
        setScroll(window.scrollY)
    })
    return (
        <div className="header">
            <div className="headerTitles">
                {
                    scroll <=0 &&
                    <h1>Gallery APP</h1>
                }
            </div>
            <div className="Socialmedia">
                <a href="https://www.facebook.com/amarwalia76">facebook</a>
                <a href="https://www.instagram.com/chauhann_rohit?igsh=NXpsNXh6MngxZXh3">instagram</a>
                <a href="https://www.linkedin.com/in/ranveer-singh-walia-34043b247/">linkedin</a>
            </div>
        </div>
    )
}