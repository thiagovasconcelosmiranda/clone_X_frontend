"use client"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const NavLogout = () => {
    const router = useRouter();
    const { setUserInfo } = useContext(AuthContext);

    const handleClick = () => {
        if (confirm('Deseja sair?')) {
            setUserInfo({});
            sessionStorage.setItem('user', '');
            router.replace('/signin');
        }
    }

    return (
        <div onClick={handleClick} className={` cursor-pointer flex items-center  gap-6 py-3 opacity-50 hover:opacity-100`}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-6" />
            <div className="text-lg">Sair</div>
        </div>
    )


}   