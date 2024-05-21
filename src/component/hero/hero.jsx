import React from 'react'
import './hero.css'

export default function Hero({bool1,setBool1,loggedIn}) {
    return (
        <div className="hero">
            <div className="hero_text">
                <h1 className="hero_title">Welcome to the Gallery App</h1>
                <p className="hero_description">The best place to share your photos</p>
                <div className="hero_button">
                    <button className="hero_btn login" onClick={
                        ()=>{
                            !loggedIn?setBool1(!bool1):window.location.pathname=('/gallery');
                        }
                    }>Get Started</button>
                </div>
            </div>
        </div>
    )
}