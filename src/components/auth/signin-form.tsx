"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import authSign from "@/data/api-signin";
import { ErrorInput } from "../ui/error-input";
import { AlertForm } from "../ui/alert-form";
import { Checkbox } from "../ui/checkbox";

export const SigninForm = () => {
    const router = useRouter();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);


    useEffect(() => {
        getCheck();
    }, []);

    const handleEnterButton = async () => {
        setButtonDisabled(true);
        const res = await authSign.signin(emailField, passwordField);

        if (res.token) {
            sessionStorage.setItem('user', JSON.stringify(res));
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('slug', res.user.slug);
            sessionStorage.setItem('avatar', res.user.avatar);
            setCheck(emailField, passwordField);
            router.replace('/home');
            return;

        }

        if (res.error === 'Acesso negado') {
            setVisibleAlert(true);
            setTextAlert(res.error);
            setButtonDisabled(false);
        }

        setTimeout(() => {
            setVisibleAlert(false);
        }, 2000)
        inputError(res);
    }

    const inputError = (res: any) => {
        setErrorEmail(res.error ? res.error.email : '');
        setErrorPassword(res.error ? res.error.password : '');
    }

    const setCheck = (email: string, password: string) => {
        if (isCheck == true) {
            console.log(email)
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
            return
        }
        sessionStorage.setItem('email', '');
        sessionStorage.setItem('password', '');

    }

    const getCheck = () => {
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');
        if (email && password) {
            setIsCheck(true);
            setEmailField(email);
            setPasswordField(password);
        }
    }

    const handleButtonCheck = () => {
        if (isCheck === true) {
            setIsCheck(false);
        } else {
            setIsCheck(true);
        }
    }


    return (
        <>
            <Input
                placeholder="Digite seu email"
                value={emailField}
                onChange={t => setEmailField(t)}
            />
            {errorEmail != '' && (
                <ErrorInput text={errorEmail} />
            )}

            <Input placeholder="Digite sua senha"
                value={passwordField}
                onChange={t => setPasswordField(t)}
                password
            />
            {errorPassword != '' && (
                <ErrorInput
                    text={errorPassword}
                />
            )}
            <Checkbox
                onclick={handleButtonCheck}
                checked={isCheck}
            />
            <Button label='Entrar'
                onClick={handleEnterButton}
                size={1}
                disabled={buttonDisabled}
            />
            {visibleAlert && (
                <AlertForm msg={textAlert} />
            )}
        </>
    )
}