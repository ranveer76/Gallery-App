import React from 'react'
import Form from '../component/form/form'
import '../assets/css/contact.css'

export default function Contact({loggedIn, feedback, setFeedback, username}) {
    return (
        <div className='contact'>
            <div className='contact-header'>
                <h1>Contact Us</h1>
                <p>Fill out the form below to contact us</p>
            </div>
            <Form loggedIn={loggedIn} comments={feedback} setComments={setFeedback} username={username}/>
        </div>
    )
}