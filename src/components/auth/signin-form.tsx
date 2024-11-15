"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import authSign from "@/data/api-signin";
import { ErrorInput } from "../ui/error-input";

export const SigninForm = () => {
    const router = useRouter();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleEnterButton = async () => {
        
        const res = await authSign.signin(emailField, passwordField);
         if (res.token) {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('slug', res.user.slug);
            router.replace('/home');
         }
         if(res.error=== 'Acesso negado'){
            alert(res.error);
         }
         inputError(res);
    }

    const inputError = (res: any) => {
        setErrorEmail(res.error ? res.error.email : '');
        setErrorPassword(res.error ? res.error.password : '');
    }

    return (
        <>
            <Input placeholder="Digite seu email"
                value={emailField}
                onChange={t => setEmailField(t)}
            />
            {errorEmail != '' && (
                <ErrorInput text={errorEmail}/>
            )}

            <Input placeholder="Digite sua senha"
                value={passwordField}
                onChange={t => setPasswordField(t)}
                password
            />
            {errorPassword != '' && (
               <ErrorInput
               text= {errorPassword}
               />
            )}

            <Button label='Entrar'
                onClick={handleEnterButton}
                size={1}
            />

        </>
    )
}