import { useEffect, useState } from "react"

interface Video {
    video: {
      id: string,
      time: number,
      active: boolean,
      lastUpdate: number
    }
  }

export default function Page() {
    const [userVideo, setUserVideo] = useState<Video | null>(null);

    useEffect(() => {
        fetch(`https://youtube-friends.onrender.com/api/get-user-video`)
                .then((res) => res.json())
                .then((data) => {
                  setUserVideo(data);
                })
      .catch(error => console.error('Error:', error));
    }, []);

    return(
        <p>{userVideo?.video.id}</p>
    )
}