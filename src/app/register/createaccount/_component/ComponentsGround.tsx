'use client'

import { useState } from "react";
import EmailPasswordBox from "./EmailPasswordBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ComponentsGround() {
    const [isPasswordMatch, setPasswordMatch] = useState<boolean>(false);
    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [isEmailValid, setEmailValid] = useState<boolean>(false);
    const [isEmailAlreadyReg, setEmailAlreadyReg] = useState<boolean>(false);

    const router = useRouter();
    const handleButtonClick = () => {
        if (!isEmailValid) {
            (document.getElementById('message') as HTMLInputElement).style.color = 'red';
            (document.getElementById('message') as HTMLInputElement).innerHTML = 'Email invalid';
            console.log("invalid email");
        } else if (!isPasswordMatch) {
            console.log("password don't match");
        } else if (!isPasswordValid) {
            (document.getElementById('message') as HTMLInputElement).style.color = 'red';
            (document.getElementById('message') as HTMLInputElement).innerHTML = 'password invalid';
            console.log("invalid password");
        } else if (!isEmailAlreadyReg) {
            (document.getElementById('message') as HTMLInputElement).style.color = 'red';
            (document.getElementById('message') as HTMLInputElement).innerHTML = 'this email is already have an account';
            console.log("this email is already have an account");
        } else {
            const password = document.getElementById('Password') as HTMLInputElement;
            const email = document.getElementById('Email') as HTMLInputElement;
            console.log(`Email: ${email.value} \n Password: ${password.value}`)
            router.push("/register/tellUsAboutYourself/host");
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Create your account</h1>
            <EmailPasswordBox setPasswordMatch={setPasswordMatch}
            setPasswordValid={setPasswordValid} setEmailValid={setEmailValid}
            setEmailAlreadyReg={setEmailAlreadyReg}/>
            <Button variant="outline" onClick={()=>{handleButtonClick();}}>Next</Button>
        </div>
    )
}