import React, { useState, useEffect } from 'react'
import './form.css'

const database = location.protocol + '//' + location.hostname + ':3001' + '/Comments'

export default function Form({loggedIn, comments, setComments, username}) {
    const [UserId, setUserId] = useState(null)
    const [name, setName] = useState(username || 'Enter Name')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')

    useEffect(() => {
        if(loggedIn){
            fetch(database.split('/Comments')[0]+ '/Users?name='+username)
                .then(res => res.json())
                .then(data => {
                    if(data.length === 0){
                        setUserId(null)
                        setName('')
                        setEmail('')
                        return
                    }
                    setUserId(data[0].id)
                    setName(data[0].name)
                    setEmail(data[0].email)
                })
                .catch(err => console.log(err))
        }
        else{
            setUserId(null)
            setName('')
            setEmail('')
        }
    }, [loggedIn])

    useEffect(() => {
        fetch(database)
            .then(res => res.json())
            .then(data => {
                if(data){
                    data = data.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            comment: item.feedback,
                            created_at: item.created_at
                        }
                    })
                } else {
                    data = []
                }
                setComments(data)
            })
    }, [])

    const handleComment = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const id = comments.length + 1
        const time =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate() +
        ' ' +
        new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds()
        const data = { id, user_id:UserId?UserId:'', name, email, comment, created_at:time, updated_at:time }
        fetch(database, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                setComments([...comments, data])
                setComment('')
            })
    }
    return (
        <div className='contact-form'>
            <form onSubmit={handleComment}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={
                        (e) => setEmail(e.target.value)
                    }/>
                </label>
                <label>
                    Feedback:
                    <textarea name="Feedback" value={comment} onChange={
                        (e) => setComment(e.target.value)
                    }/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}