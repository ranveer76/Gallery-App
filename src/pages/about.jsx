import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/about.css'

export default function About() {
    return (
        <div className='about'>
            <h2>About</h2>
            <p>Welcome to our Image Gallery App!</p>
            <p>This app allows you to organize and view your images with ease. You can create albums, upload images, and browse through your collection effortlessly.</p>
            <h3>Features:</h3>
            <ul>
                <li>Upload and store images securely</li>
                <li>Create custom albums to organize your images</li>
                <li>View images in a responsive and user-friendly gallery</li>
                <li>Select and delete multiple images at once</li>
                <li>Add images to albums for easy access</li>
            </ul>
            <h3>Technology Stack:</h3>
            <ul>
                <li>Frontend: React.js, HTML, CSS</li>
                <li>Backend: json-server</li>
                <li>Database: json</li>
            </ul>
            <h3>Developers:</h3>
            <ul>
                <li>Ranveer Singh Walia - Full Stack Developer</li>
                <li>Rohit - UI/UX Designer</li>
            </ul>
            <p>For more information, feel free to <Link to='/contact'>contact us</Link></p>
        </div>
    )
}


