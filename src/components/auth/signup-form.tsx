"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../ui/input";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";


export const SignupForm = () => {
    const router = useRouter();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    
    const handleEnterButton = () => {
        router.replace('/home');
    }

    return (
        <>
            <Input placeholder="Digite seu nome"
                value={nameField}
                onChange={t => setNameField(t)}
           />

            <Input placeholder="Digite seu Email"
                value={passwordField}
                onChange={t=> setPasswordField(t)}
            />
             <Input placeholder="Digite sua nova senha"
                value={passwordField}
                onChange={t=> setPasswordField(t)}
                password
            />

            <Button label='Crie sua conta'
             onClick={handleEnterButton}
             size={1}
            />
        </>
    )
}