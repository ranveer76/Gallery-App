import React,{useState, useEffect} from 'react'
import "./sidebar.css"

const databasehost = location.protocol + '//' + location.hostname + ':3001'

export default function Sidebar({ user_id, setSelectedAlbum, albums, setAlbums}) {

    const handlealbumcreation = () => {
        const albumname = prompt('Enter the name of the album')
        if(albumname && !albums.includes(albumname)){
            fetch(databasehost + '/Albums?user_id='+user_id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: `${albums.length + 1}`,
                    name: albumname,
                    user_id: user_id,
                    photo_id: []
                })
            })
            .then(res => res.json())
            .then(data => {
                setAlbums([...albums, data])
            })
        } else {
            alert('Album name already exists or empty')
        }
    }
    useEffect(() => {
        fetch(databasehost + '/Albums?user_id='+user_id)
        .then(res => res.json())
        .then(data => {
            setAlbums(data)
        })
    }, [user_id])

    return (
        <div className="sidebar">
            <div className="sidebarheader">
                <h1 onClick={()=>setSelectedAlbum(null)}>Albums</h1>
                <button onClick={handlealbumcreation}>Create Album</button>
            </div>
            <div className="sidebarItem_list">
                {
                    Array.from(albums).map((album, index) => {
                        return (
                            <div key={index} className="sidebarItem" onClick={() => setSelectedAlbum(album)}>
                                <h3>{album.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}