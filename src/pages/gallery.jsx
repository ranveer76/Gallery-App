import React, { useState, useEffect, useRef } from "react";
import "../assets/css/gallery.css";
import UploadImg from "../component/upload_img/upload_img";

const databasehost = location.protocol + '//' + location.hostname + ':3001'

<<<<<<< HEAD
export default function Gallery({ user_id, SelectedAlbum, setSelectedAlbum, albums, setAlbums, images, setImages}) {
=======
export default function Gallery({ user_id, setUser, SelectedAlbum, setSelectedAlbum, albums, setAlbums, images, setImages}) {
>>>>>>> 730c8ab (initial)
    const [Allimages, setAllImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [doubleclicked, setDoubleclicked] = useState(null);
    const [dragging, setDragging] = useState(false);
<<<<<<< HEAD
=======
    const [startX, setStartX] = useState(null);
    const [startY, setStartY] = useState(null);
>>>>>>> 730c8ab (initial)
    const [openedimg, setOpenedimg] = useState(null);
    const [datalen, setDatalen] = useState(0);
    const [upload, setUpload] = useState(false);
    const [albumopen, setAlbumopen] = useState(false);
    const [albumid, setAlbumid] = useState(null);

    useEffect(() => {
        if(SelectedAlbum){
            if(SelectedAlbum.photo_id.length === 0){
                setImages([]);
                setDatalen(0);
            }
                else{
                    let remaining = Allimages.filter((image) => SelectedAlbum.photo_id.includes(image.id));
                    setImages(remaining);
                    setDatalen(remaining.length);
                }
    } else {
            setImages(Allimages);
        }
    }
    , [SelectedAlbum, user_id]);

    useEffect(() => {
        fetch(databasehost + "/Albums?user_id=" + user_id)
        .then((response) => response.json())
        .then((data) =>{
            setAlbums(data)
            // console.log(data)
        });
        fetch(databasehost + '/Images?user_id=' + user_id)
        .then((response) => response.json())
        .then((data) => {
            setAllImages(data); 
            setDatalen(data.length);
            setImages(data);
        });
    }, [user_id]);

    useEffect(() => {
        document.body.style.position= albumopen ? 'fixed' : '';
        document.addEventListener('click', (e) => {
            if(!e.target.className.includes('album')){
                setAlbumopen(false);
            }
        });
    }, [albumopen])

    const toggleImageSelection = (imageId) => {
        if (selectedImages.includes(imageId)) {
        setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
        setSelectedImages([...selectedImages, imageId]);
        }
    };

    const handleImageMouseDown = (imageId, e) => {
        e.preventDefault();
        setDragging(true);
<<<<<<< HEAD
=======
        setStartX(e.clientX);
        setStartY(e.clientY);
>>>>>>> 730c8ab (initial)
        if (e.ctrlKey || e.shiftKey) {
        toggleImageSelection(imageId);
        } else {
        if (!selectedImages.includes(imageId)) {
            setSelectedImages([imageId]);
        } else {
            setSelectedImages([]);
        }
        }
    };

    const handleImageMouseEnter = (imageId) => {
        if (dragging) {
        toggleImageSelection(imageId);
        }
    };

    const handleImageMouseUp = () => {
        setDragging(false);
    };

    const handleDeleteSelectedImages = () => {
        let remainingImages = Allimages.filter(
        (image) => !selectedImages.includes(image.id)
        );
        setAllImages(remainingImages);
        remainingImages = images.filter(
        (image) => !selectedImages.includes(image.id)
        );
        setImages(remainingImages);
        setDatalen(remainingImages.length);

        selectedImages.forEach((imageId) => {
        fetch(databasehost+ "/Images/" + imageId, {
            method: "DELETE",
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
            })
            .catch((error) => {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
            });
        });
        setSelectedImages([]);
    };
    const handleImageDoubleClick = (imageId) => {
        setOpenedimg(imageId);
        setDoubleclicked(imageId);
        setSelectedImages([]);
        const img = new Image();
        document.querySelector('.navbar').style.display = "none";
        img.src = document.getElementById(`image-${imageId}`).src;
        img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgRatio = imgWidth / imgHeight;
        const windowRatio = window.innerWidth / window.innerHeight;
        if (imgRatio > windowRatio) {
            img.style.width = "80%";
        } else {
            img.style.height = "80%";
        }
        };
        img.id = "opened-img-"+imageId;
        img.style.position = "fixed";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)";
        img.style.zIndex = "1";
        img.style.cursor = "pointer";
        document.body.style.position = "fixed";
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        img.oncontextmenu = (e) => {
            e.preventDefault();
            const contextMenu = document.getElementById("context-menu");
            contextMenu.style.display = "block";
            contextMenu.style.left = `${e.pageX}px`;
            contextMenu.style.top = `${e.pageY}px`;

            document.onclick = (e) => {
                contextMenu.style.display = "none";
            };
        };

        window.onclick = (e) => {
            if(e.target !== img){
                setOpenedimg(null);
                document.body.style.position = "";
                document.body.style.backgroundColor = "";
                document.querySelector('.navbar').style.display = "flex";
                img.remove();
            }
        }

        document.body.appendChild(img);
    };

    const handleDoubleclickdelete = () => {
        const remainingImages = images.filter(
            (image) => image.id !== doubleclicked
        );
        setImages(remainingImages);
        setDatalen(remainingImages.length);
        fetch(databasehost+ "/Images/"+ doubleclicked, {
            method: "DELETE",
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
            })
            .catch((error) => {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
            });
        setSelectedImages([]);
        setOpenedimg(null);
        document.body.style.position = "";
        document.body.style.backgroundColor = "";
        document.querySelector('.navbar').style.display = "flex";
        document.getElementById(`image-${doubleclicked}`).remove();
    }

    const handleadding = (id) => {
        setAlbumid(id);
        if(albumid !== null){
            fetch(databasehost + '/Albums?user_id='+user_id+'&id='+albumid)
            .then(response => response.json())
            .then(album => {
                let updatedPhotoIds = album[0].photo_id.concat(selectedImages);
                fetch(databasehost+ '/Albums/'+albumid, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }}).then(() => {
                    fetch(databasehost+ '/Albums', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: albumid,
                            user_id: user_id,
                            name: album[0].name,
                            photo_id: updatedPhotoIds
                        })
                    })
                })
            });
            const updatedalbum = albums.map((album) => {
                if(album.id === albumid){
                    return {
                        ...album,
                        photo_id: album.photo_id.concat(selectedImages)
                    }
                }
                return album;
            });
            setAlbums(updatedalbum);
            setSelectedImages([]);
            setAlbumopen(false);
            setAlbumid(null);
        }
    }

    const handleRemovefromAlbum = () => {
        fetch(databasehost + '/Albums?user_id='+user_id+'&id='+SelectedAlbum.id)
            .then(response => response.json())
            .then(album => {
                let updatedPhotoIds = album[0].photo_id.filter((id) => !selectedImages.includes(id));
                fetch(databasehost+ '/Albums/'+SelectedAlbum.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: SelectedAlbum.id,
                        user_id: user_id,
                        name: SelectedAlbum.name,
                        photo_id: updatedPhotoIds
                    }),
                })
            });
            const updatedalbum = albums.map((album) => {
                if(album.id === SelectedAlbum.id){
                    return {
                        ...album,
                        photo_id: album.photo_id.filter((id) => !selectedImages.includes(id))
                    }
                }
                return album;
            });
            setAlbums(updatedalbum);
            setImages(images.filter((image) => !selectedImages.includes(image.id)));
            // console.log(images);
            setSelectedImages([]);
    }

    const handleCreateAlbum = () => {
        const albumname = prompt('Enter the name of the album');
        if(albumname && !albums.includes(albumname)){
            fetch(databasehost + '/Albums', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: `${albums.length + 1}`,
                    name: albumname,
                    user_id: user_id,
                    photo_id: [...selectedImages],
                    created_at: new Date().toISOString(),
                })
            })
            .then(res => res.json())
            .then(data => {
                setAlbums([...albums, data])
                setSelectedImages([]);
                setAlbumopen(false);
            })
        } else {
            alert('Album name already exists or empty')
        }
    }

    const handleAlbumDelete = () => {
        fetch(databasehost + '/Albums/'+SelectedAlbum.id, {
            method: 'DELETE'
        })
        setAlbums(albums.filter((album) => album.id !== SelectedAlbum.id));
        setSelectedAlbum(null);
    }

    document.onclick = (e) => {
        if(!e.target.className.includes('upload') || e.target.className.includes('upload-overlay')){
            setUpload(false);
        }
    }
    return (
        <div className="gallery">
            <div className="gallery_head">
                <div className="head">
                    <h1>Gallery</h1>
                        {
                            SelectedAlbum && (
                                <button onClick={()=>setSelectedAlbum(null)}>
                                    Back
                                </button>

                            )
                        }
                </div>

                <div className="buttons">
                {selectedImages.length > 0 && (
                    <>
                        {!SelectedAlbum &&
                            <div className="dropdown">
                                <button className="album-open" onClick={()=>setAlbumopen(!albumopen)}>
                                Add to Album
                            </button>
                                {
                                    albumopen && (
                                        <div className="album-overlay">
                                            <div className="album">
                                                <h1 className="album-head">Album</h1>
                                                <button className='album-btn' onClick={()=>{
                                                    handleCreateAlbum();
                                                }}>Create Album</button>
                                                <div className="albumItem_list">
                                                    {
                                                        albums.map((album) => {
                                                            return (
                                                                <div className="albumItem" key={album.id} onClick={()=>{handleadding(album.id)}}>
                                                                    <h3 className="album-h3">{album.name}</h3>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        }
                        {SelectedAlbum && (
                            <button onClick={handleRemovefromAlbum}>
                                Remove from Album
                            </button>
                        )
                        }
                        <button onClick={handleDeleteSelectedImages}>
                        Delete Selected
                        </button>
                    </>
                )}
                {
                    SelectedAlbum && (
                        <button onClick={handleAlbumDelete}>
                            Delete Album
                        </button>
                    )
                }
                <button className="upload-btn" onClick={() => setUpload(!upload)}>Upload</button>
                </div>
            </div>
            {upload && (
                <div className="upload-overlay">
                    <UploadImg
                    setImages={setImages}
                    images={images}
                    userid={user_id}
                    datalen={datalen}
                    setDatalen={setDatalen}
                    />
                </div>
            )}
            <div className="gallery-images" onMouseUp={handleImageMouseUp}>
                {
                images.map((image) => (
                <div
                    key={image.id}
                    className="gallery-image-container"
                    onMouseDown={(e) => handleImageMouseDown(image.id, e)}
                    onMouseEnter={() => handleImageMouseEnter(image.id)}
                >
                    <img
                    id={`image-${image.id}`}
                    className="gallery-image"
                    src={image.url}
                    alt={image.title}
                    onDoubleClick={() => handleImageDoubleClick(image.id)}
                    />
                    <input
                    type="checkbox"
                    checked={selectedImages.includes(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    />
                </div>
                ))}
            </div>
            {openedimg && (
                <div className="gallery-image-overlay">
                </div>
            )}
            {openedimg && (
                <div id="context-menu" className="context-menu">
                <ul>
                    <li>Edit</li>
                    <li onClick={(e)=>{handleDoubleclickdelete()}}>Delete</li>
                </ul>
            </div>)}
        </div>
    );
}
