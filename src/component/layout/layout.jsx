import React, {useState, useEffect} from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import Header from '../header/header'
import LoginSignup from '../Login_Signup/login_signup';
import Sidebar from '../sidebar/siderbar';


const databasehost = location.protocol + '//' + location.hostname + ':3001'
export default function Layout({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [signup, setSignup] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [bool1, setBool1] = useState(false);
    const [user_id, setUser] = useState(null);
    const [SelectedAlbum, setSelectedAlbum] = useState(null);
    const [albums, setAlbums] = useState([])
    const [images, setImages] = useState([]);
    const [feedback, setFeedback] = useState([])

    useEffect(() => {
        fetch(databasehost + '/Users?name='+username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then(data => {
            if(data.length > 0) {setUser(data[0].id); setLoggedIn(true)}
            else {setUser(0); setLoggedIn(false);}
        })
    }, [username])

    useEffect(() => {
        fetch(databasehost + '/Comments', {
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
                        name: item.name,
<<<<<<< HEAD
                        comment: item.feedback,
=======
                        feedback: item.feedback,
>>>>>>> 730c8ab (initial)
                        created_at: item.created_at
                    }
                })
            } else {
                data = []
            }
            setFeedback(data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        fetch(databasehost + '/Albums'+'?user_id='+user_id)
        .then(res => res.json())
        .then(data => {
            setAlbums(data)
        })
    }, [user_id])
    document.title = 'Photo Gallery/'+children.type.name;
    if(children.type.name === 'Home'){
        children = React.cloneElement(children, {bool1, setBool1, loggedIn, user_id, setUser, feedback, setFeedback, username});
    }
    else if(children.type.name === 'Gallery'){
        children = React.cloneElement(children, {user_id, setUser, SelectedAlbum, setSelectedAlbum, loggedIn, albums, setAlbums, images, setImages});
    }
    else if(children.type.name === 'Contact'){
        children = React.cloneElement(children, {loggedIn, feedback, setFeedback, username});
    }

    document.addEventListener('click', (e) => {
        if(children.type.name !== 'About' &&!e.target.className.includes('login_signup') && !e.target.className.includes('login')){
            setBool1(false)
        }
    });
    return (
        <>
            <Header />
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setSignup={setSignup} signup={signup} setBool1={setBool1} Bool1={bool1} setUsername={setUsername}/>
            {
                !loggedIn && bool1 && 
                <LoginSignup setLoggedIn={setLoggedIn} setSignup={setSignup} signup={signup} setUsername={setUsername}/>
            }
            {
                children.type.name === 'Gallery'? (
                        <div className='gallery-container'>
                            <Sidebar user_id={user_id} setSelectedAlbum={setSelectedAlbum} setAlbums={setAlbums} albums={albums}/>
                            {children}
                        </div>
                    ):(
                        <>
                            <div className='container'>
                            {children}
                            </div>
                        </>
                    )
            }
            <Footer />
        </>
    )
}