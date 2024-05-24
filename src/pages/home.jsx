import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Hero from '../component/hero/hero'
import Form from '../component/form/form'
import '../assets/css/home.css';

const databasehost = location.protocol + '//' + location.hostname + ':3001'

export default function Home({bool1, setBool1, loggedIn, user_id, feedback, setFeedback, username}) {
    const d=[
        {id: 1, img: 'https://cdn.wallpapersafari.com/70/1/yGSYxk.jpg',
        title: 'Sample 1'},
        {id: 2, img: 'https://wallpapercave.com/wp/wp9073908.jpg',
        title: 'Sample 2'},
        {id: 3, img: 'https://wallpapercave.com/wp/wp4983865.jpg',
        title: 'Sample 3'},
        {id: 4, img: 'https://wallpapercrafter.com/desktop/4768-city-street-buildings-cars-road-4k.jpg',
        title: 'Sample 4'},
        {id: 5, img: 'https://wallpaperaccess.com/full/31202.jpg',
        title: 'Sample 5'},
        {id: 6, img: 'https://wallpapercave.com/wp/wp2707539.jpg',
        title: 'Sample 6'}]
    const [sample, setSample] = React.useState(d)

    useEffect(() => {
        if(!user_id){
            setSample(d)
            return
        }
        fetch(databasehost + '/Images?user_id='+user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                data = data.map(item => {
                    return {
                        id: item.id,
                        img: item.url,
                        title: item.title
                    }
                })
            } else {
                data = d
            }
            setSample(data)
        }).catch(err => {
            console.log(err)
        })
    }, [user_id])

    return (
        <div className='home'>
            <Hero bool1={bool1} setBool1={setBool1} loggedIn={loggedIn}/>
            <div className="home-gallery">
                <h1>Gallery</h1>
                <div className="gallery-sample">
                    {sample.length > 0 ? (
                        sample.map(item => (
                            <Link to='/gallery' onClick={(e)=>{
                                if(!loggedIn){
                                    e.preventDefault()
                                    setBool1(true)
                                } 
                            }} className="gallery-sample-item login-gallery" key={item.id} >
                                <img src={item.img} className='login-gallery' alt={item.title} />
                                <p className='login-gallery'>{item.title}</p>
                            </Link>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <div className="home-feedback">
                <h1>Feedback</h1>
                <p>What do you think of our gallery? Let us know!</p>
                <div className="feedback-slides">
                    <div className="feedback-container">
                        {feedback.length > 0 ? (
                            feedback.map(item => (
                                <div className="feedback-slide" key={item.id}>
                                    <p>{item.name}</p>
<<<<<<< HEAD
                                    <p>{item.comment}</p>
=======
                                    <p>{item.feedback}</p>
>>>>>>> 730c8ab (initial)
                                    <p>Created At:</p>
                                    <p>{item.created_at}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-container">
                <Form loggedIn={loggedIn} comments={feedback} setComments={setFeedback} username={username}/>
            </div>
        </div>
    )
}
