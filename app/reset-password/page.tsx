'use client'

import { useState } from "react"

interface Video {
    video: {
      id: string,
      time: number,
      active: boolean,
      lastUpdate: number
    }
  }

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userVideo, setUserVideo] = useState<Video | null>(null);
    const [id, setId] = useState('');
    
    const login = () => {
        fetch("https://server.studiomodvis.com/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: 'studiomodvis@gmail.com',
                password: 'modvis123'
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.id !== undefined) {
                setLoggedIn(true);
                setId(data.id);
                return;
            }
        });
    }

    const updateUserVideo = () => {
        fetch(`https://server.studiomodvis.com/api/get-user-video`, {
            credentials: "include",
        })
                  .then((res) => res.json())
                  .then((data) => {
                    setUserVideo(data);
                  })
        .catch(error => console.error('Error:', error));
      }

    return(
        <>
            <button onClick={login}>LogIn</button>
            <button onClick={updateUserVideo}>updateVideo</button>
            {loggedIn && <p>Logged In</p>}
            {userVideo !== null && <p>{userVideo.video.id}</p>}
            <p>{id}</p>
        </>
    )
}