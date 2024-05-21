import React, { useState, useEffect, useRef } from 'react';

const databasehost = location.protocol + '//' + location.hostname + ':3001';

export default function UploadImg({ setImages, images, userid}) {
    const files = useRef([]);
    const [fileUrls, setFileUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const[value, setValue] = useState('');
    const [uRL, setURL] = useState('');
    const [datalen, setDatalen] = useState(0);

    useEffect(() => {
        fetch(databasehost + '/Images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setDatalen(data.length);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
    }, []);


    const img_url = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const datahandler = async e => {
        e.preventDefault();
        setLoading(true);
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
            new Date().getSeconds();

        if(fileUrls.length <= 0 && uRL){
            const uploadPromises = Array.from(uRL.split(' ')).map(async (url, index) => {
                                        const data = {
                                            id: `${datalen+index+1}`,
                                            user_id: userid,
                                            tag: '',
                                            caption: '',
                                            filename: 'Image'+(datalen+index+1),
                                            url: url,
                                            uploaded_at: time,
                                            updated_at: time
                                        };

                                        return fetch(databasehost + '/Images', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        }).then(response => response.json())
                                    });
            Promise.all(uploadPromises)
                .then(newImages => {
                    if (Array.isArray(newImages)) {
                        setImages([...images, ...newImages]);
                        setDatalen(datalen + newImages.length);
                    } else {
                        console.error('Error uploading files: Invalid response format');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error uploading files:', error);
                    setLoading(false);
                });
            setFileUrls([]);
            setURL('');
            return;
        }

        const uploadPromises = files.current.map(async (file, index) => {
            const url = await img_url(file);
            const data = {
                id: `${datalen+index+1}`,
                user_id: userid,
                tag: '',
                caption: '',
                filename: file.name,
                url: url,
                uploaded_at: time,
                updated_at: time
            };
            return fetch(databasehost+'/Images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
        });
    
        Promise.all(uploadPromises)
            .then(newImages => {
                setImages([...images, ...newImages]);
                setDatalen(datalen + newImages.length);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error uploading files:', error);
                setLoading(false);
            });
        files.current = [];
        setFileUrls([]);
        setValue('');
    };
    

    const handleFileChange = e => {
        const selectedFiles = Array.from(e.target.files);
        files.current = selectedFiles;
        const urlsPromises = selectedFiles.map(file => img_url(file));
        Promise.all(urlsPromises).then(urls => {
            setFileUrls(urls);
            const fileNames = selectedFiles.map(file => file.name);
        });
        setValue(e.target.value);
    };
    
    const handleButton = e => {
        // console.log(fileUrls.length, uRL);
        if (fileUrls.length <= 0 && !uRL) {
            e.preventDefault();
            e.target.previousElementSibling.click();
        } else if(uRL){
            e.preventDefault();
            const URLS = uRL.split(' ');
            setFileUrls(URLS);
            datahandler(e);
        }
    }

    return (
        <div className='upload'>
            <form className='upload-form' onSubmit={datahandler}>
                {
                    (fileUrls.length > 0 || uRL) && (
                        <div className='preview' onClick={()=>{
                            files.current = [];
                            setFileUrls([]);
                            setURL('');
                            setValue('');
                        }}>
                            <img className='upload-img-preview' src={(uRL)?uRL:fileUrls[0]} alt='preview' />
                        </div>
                    ) || 
                    !uRL &&(
                        <>
                            <label className='upload-input-content' htmlFor="url">Images Links</label>
                            <input className='upload-input-content' type="text" id="url" value={uRL} onChange={e => setURL(e.target.value)} />
                            <input className='upload-input-content' type="file" multiple onChange={handleFileChange} value={value}/>
                        </>
                    )
                }
                <button className='uploading-btn' type="submit" disabled={loading} onClick={handleButton}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}
