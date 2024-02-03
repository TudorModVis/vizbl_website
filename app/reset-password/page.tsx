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
    
    const login = () => {
        fetch("https://youtube-friends.onrender.com/api/login", {
            method: "POST",
            mode: "cors",
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
                return;
            }
        });
    }

    const updateUserVideo = () => {
        fetch(`https://youtube-friends.onrender.com/api/get-user-video`)
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
        </>
    )
}