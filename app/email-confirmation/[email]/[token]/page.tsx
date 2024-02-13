'use client'

import { useEffect, useState } from "react"
import LinkState from "@/app/shared/LinkState";

export default function Page({ params }: { params: { token: string, email: string } }) {
    const [pageContent, setPageContent] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://server.studiomodvis.com/api/email-confirmation?token=" + params.token + "&email=" + decodeURIComponent(params.email), {
            credentials: 'include'
        })
        .then(res => {
           res.ok ? setPageContent('success') : setPageContent('invalid');
        });
    }, []);

    const contentToLoad = pageContent === 'invalid' ? 
    <LinkState title="YOUR VERIFICATION LINK HAS EXPIRED" text="Your verification link has expired, if you aren’t yet verified open the extension to resend the link." succes={false} /> : 
    <LinkState title="YOUR ACCOUNT HAS BEEN VERIFIED" text="We’ve been able to confirm your identity and now we are sure you did not type a random email." succes={true} />

    if (pageContent === null) {
        return;
    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center">
            <img src="/images/bg.png" alt="background" className="absolute left-0 top-0 w-full h-full object-cover -z-10"/>
            <img src="/images/logo.png" alt="logo" className="absolute left-[4.5rem] top-12 w-[8.3vw] max-w-40" />
            {contentToLoad}
        </div>
    )
}