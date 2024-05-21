import React, { useState, useEffect } from 'react'
import './login.css';
const databasehost = location.protocol + '//' + location.hostname + ':3001'

export default function LoginSignup({ setLoggedIn, signup, setSignup, username, setUsername}) {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [error, setError] = useState(false);
    const [userdatalength, setUserdatalength] = useState(0);
    const [remember, setRemember] = useState(false);
    
    useEffect(() => {
        fetch(databasehost+'/Users')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setUserdatalength(data.length);
            });
    }, [signup]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (signup) {
            if (password !== cPassword) {
                setError('Passwords do not match');
            } else {
                fetch(databasehost + '/Users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: `${userdatalength +1}`,
                        name: name,
                        email: email,
                        password: password 
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        if(remember){
                            localStorage.setItem('username', name);
                        }
                        setLoggedIn(true);
                        setUsername(name);
                    });
            }
        } else {
            fetch(databasehost+'/Users?name=' + name + '&password=' + password)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length === 0) {
                        fetch(databasehost+'/Users?email=' + email + '&password=' + password)
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.length === 0) {
                                    setError('Invalid username or password');
                                } else {
                                    // console.log(data);
                                    if(remember){
                                        localStorage.setItem('username', data[0].name);
                                    }
                                    setLoggedIn(true);
                                    setUsername(data[0].name);
                                }
                            });
                    } else {
                        if(remember){
                            localStorage.setItem('username', name);
                        }
                        setLoggedIn(true);
                        setUsername(name);
                    }
                });
        }
    };
    useEffect(() => {
        if (error) {
            if(confirm(error)){
                setError(false);
                setCPassword('');
                setEmail(null);
                setPassword('');
                setUsername(null);
                setname('');
                setRemember(false);
            }
        }
    }, [error]);
    return (
        <>
            <form className='login_signup' onSubmit={handleSubmit}>
                <h1 className='login'>{signup ? 'Sign Up' : 'Login'}</h1>
                <input
                    className='login'
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    placeholder='Username'
                    onChange={(e) => setname(e.target.value)}
                    required
                />
                {signup && (
                    <>
                        <input
                            className='login'
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    className='login'
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {signup && (
                    <>
                        <input
                            className='login'
                            type='password'
                            id='c-password'
                            name='c-password'
                            placeholder='Confirm Password'
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                        />
                    </>
                )}
                <div className='remember login'>
                    <input type='checkbox' className='login' id='remember' name='remember' onChange={()=>setRemember(true)} />
                        <label htmlFor='remember' className='login'>Remember me</label>
                </div>
                <button type='submit' className='login'>{signup ? 'Sign Up' : 'Login'}</button>
                <p className='login'> {signup ? 'Already have an account?' : 'Don\'t have an account?'} <span className='login' onClick={() => setSignup(!signup)}>{signup ? 'Login' : 'Sign Up'}</span></p>
            </form>
        </>
    );
}
