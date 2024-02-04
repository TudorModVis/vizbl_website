'use client'

import { useState } from "react"
import PasswordField from "./PasswordField"

export default function Page({ params }: { params: { token: string } }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const checkNewPassword = () => {
        if (newPassword === '') {
            setNewPasswordError('*This field is required');
            return 'error';
        }

        if (!/^(?=.*[1-9])[0-9a-zA-Z]{8,16}$/.test(newPassword)) {
            setNewPasswordError('*Password must be 8-16 characters long and contain at least one digit.');
            return 'error';
        }

        return 'ok';
    }

    const checkConfirmPassword = () => {
        if (confirmPassword !== newPassword) {
            setConfirmPasswordError('*Passwords do not match');
            return 'error';
        }

        return 'ok';
    }

    const sendLoginData = () => {
        if (checkNewPassword() === 'error' || checkConfirmPassword() === 'error') {
            return;
        }

        fetch("https://server.studiomodvis.com/api/reset-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: params.token
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.id !== undefined) {
                return;
            }
        });
    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center">
            <img src="/images/bg.png" alt="background" className="absolute left-0 top-0 w-full h-full object-cover -z-10"/>
            <img src="/images/logo.png" alt="logo" className="absolute left-[4.5rem] top-12 w-[8.3vw] max-w-40" />
            <div className="bg-semi-black rounded-md border border-gray w-[40rem] flex flex-col items-center pt-6 pb-12 px-16">
                <img src="/images/models/lock.png" alt="lock" className="w-60" />
                <p className="font-bold text-5xl leading-[140%] mb-6">RESET PASSWORD</p>
                <p className="text-gray font-bold leading-[140%] text-center mb-12 small">Write a new password that doesn’t match your previous one. (and remember it this time)</p>
                <PasswordField label="New Password*" password={newPassword} setPassword={setNewPassword} error={newPasswordError} setError={setNewPasswordError}/>
                <PasswordField label="Confirm New Password*" password={confirmPassword} setPassword={setConfirmPassword} error={confirmPasswordError} setError={setConfirmPasswordError}/>
                <button className="mt-[1.7rem] py-4 w-44 colored-button border border-transparent hover:border-white font-bold" onClick={sendLoginData}>Continue</button>
            </div>
        </div>
    )
}