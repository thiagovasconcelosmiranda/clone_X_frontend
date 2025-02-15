import { useEffect, useState } from "react";

type props = {
    msg: string
    visible?: boolean
}


export const AlertForm = ({ msg }: props) => {
    return (
        <div className="w-40 h-8 bg-black border border-white flex justify-center items-center p-5 fixed left-0 right-0 m-auto">
            <p className="text-center w-full font-bold text-white">{msg}</p>
        </div>
    )
}