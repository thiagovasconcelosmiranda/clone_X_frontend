"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import authSign from "@/data/api-signin";
import { ErrorInput } from "../ui/error-input";
import { AlertForm } from "../ui/alert-form";
import { AuthContext } from "@/contexts/AuthContext";
import { Checkbox } from "../ui/checkbox";

export const SigninForm = () => {
    const router = useRouter();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const { setUserInfo } = useContext(AuthContext);
    const [checkbox, setCheckbox] = useState(false);
    const[disabledButton, setDisabledButton] = useState(false);


    useEffect(() => {
        getRegister();
    }, []);

    const handleEnterButton = async () => {
        setDisabledButton(true);
        const res = await authSign.signin(emailField, passwordField);

        if (res.token) {
            sessionStorage.setItem('user', JSON.stringify({ res }));
            setUserInfo(res);
            setRegister(emailField, passwordField);
            router.replace('/home');
            return;
        }

        if (res.error === 'Acesso negado') {
            setVisibleAlert(true);
            setTextAlert(res.error);
            setDisabledButton(false);
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

    const handleButtonCheck = () => {
        if (checkbox === true) {
            setCheckbox(false);
        } else {
            setCheckbox(true);
        }
    }

    const setRegister = (email: string, password: string) => {
        if (checkbox) {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
        } else {
            sessionStorage.setItem('email', '');
            sessionStorage.setItem('password', '');
        }
    }

    const getRegister = () => {
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');

        if (email && password) {
            setEmailField(email);
            setPasswordField(password);
            setCheckbox(true);
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
                checked={checkbox}
            />
            <Button label='Entrar'
                onClick={handleEnterButton}
                size={1}
                disabled={disabledButton}
            />
            {visibleAlert && (
                <AlertForm msg={textAlert} />
            )}
        </>
    )
}