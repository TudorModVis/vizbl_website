'use client'

import { useEffect, useState } from "react"

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(false);

    
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

    return(
        <>
            <button onClick={login}>LogIn</button>
            {loggedIn && <p>Logged In</p>}
        </>
    )
}