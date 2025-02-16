"use client"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
   children: ReactNode;
   backHref: string;
}

export const GeneralHeader = ({children, backHref}: Props) => {
    const router = useRouter();
    
    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        if(!token){
            router.replace('/signin');
            return;
        }
    });
    return (
        <header className="flex gap-4 items-center p-6">
            <Link href={backHref} className="flex justify-center items-center border-2 border-gray-500 size-12 rounded-full">
               <FontAwesomeIcon icon={faArrowLeft} className="size-6"/>
            </Link>
            <div className="flex-1">{children}</div>
        </header>
    )
}