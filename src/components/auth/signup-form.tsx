"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "../ui/input";
//import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import authSign from "@/data/api-signup";
import { ErrorInput } from "../ui/error-input";


export const SignupForm = () => {
    const router = useRouter();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const[disabledButton, setDisabledButton] = useState(false);

    const handleEnterButton = async () => {
        setDisabledButton(true);
        const res = await authSign.signup(nameField, emailField, passwordField);

        if (res.token) {
            router.replace('/signin');
            return;
        }

        if (res.error === 'Acesso negado') {
            alert(res.error);
        }
        inputError(res);
        setDisabledButton(false);
    }

    const inputError = (res: any) => {
        setErrorName(res.error ? res.error.name : '')
        setErrorEmail(res.error ? res.error.email : '');
        setErrorPassword(res.error ? res.error.password : '');
    }

    return (
        <>
            <Input placeholder="Digite seu nome"
                value={nameField}
                onChange={t => setNameField(t)}
            />
            {errorName != '' && (
                <ErrorInput text={errorName} />
            )}

            <Input placeholder="Digite seu Email"
                value={emailField}
                onChange={t => setEmailField(t)}
            />
            {errorEmail != '' && (
                <ErrorInput text={errorEmail} />
            )}

            <Input placeholder="Digite sua nova senha"
                value={passwordField}
                onChange={t => setPasswordField(t)}
                password
            />
            {errorPassword != '' && (
                <ErrorInput text={errorPassword} />
            )}

            <Button label='Crie sua conta'
                onClick={handleEnterButton}
                size={1}
                disabled={disabledButton}
            />
        </>
    )
}