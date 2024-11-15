"use client"
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { Input, InputUpload } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import apiUpdate from '@/data/api-user';
import { api } from "@/data/api";
import apiavatar from '@/data/api-user';
import apicover from '@/data/api-user';


export default function Page() {
    const { userInfo } = useContext(AuthContext);
    const [nameField, setNameField] = useState(userInfo.name);
    const [linkField, setLinkField] = useState(userInfo.link);
    const [bioField, setBioField] = useState(userInfo.bio);
    const token = window.sessionStorage.getItem('token');

    const handleClickEdit = async () => {
        
        if (nameField && linkField && bioField) {
            const token = window.sessionStorage.getItem('token');

            const res = await apiUpdate.userUpdate(
                token,
                nameField,
                linkField,
                bioField
            );


            if (res.user) alert(res.user);
            if (res.error) alert(res.error);
        }
    }

    const handleUploadCover = async (file: any) => {
        if (token) {
            const res = await apicover.updateCover(
                token,
                userInfo.slug,
                file
            );
            console.log(res);
        }
    }

    const handleUploadAvatar = async (file: any) => {
        if (token) {
            const res = await apiavatar.updateAvatar(
                token,
                userInfo.slug,
                file
            );
            console.log(res);
        }
    }

    return (
        <div>
            <GeneralHeader backHref="/">
                <div className=" font-bold text-lg">Editar perfil</div>
            </GeneralHeader>

            <section className="border-b-2 border-gray-900">
                <div className="flex justify-center items-center gap-4 bg-gray-500 h-28 overflow-hidden">
                    
                    <div className=" bg-black/80 flex justify-center items-center size-12 rounded-full">
                        <label htmlFor="file">
                            <FontAwesomeIcon icon={faCamera} className="size-4 cursor-pointer" />
                        </label>
                        <InputUpload
                            id="file"
                            onChange={handleUploadCover}
                        />
                    </div>
                    <div className=" cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                        <FontAwesomeIcon icon={faXmark} className="size-4" />
                    </div>
                </div>
                <div className="-mt-12 px-6">
                    {userInfo.slug && (
                        <img
                        crossOrigin="anonymous"
                        src={userInfo.avatar}
                        alt={userInfo.name}
                        className="size-24 rounded-full"
                    />
                    )}
                   
                    <div className="-mt-24 size-24 flex justify-center items-center">
                        <div className=" bg-black/80 flex justify-center items-center size-12 rounded-full">
                            <label htmlFor="fileAvatar">
                                <FontAwesomeIcon icon={faCamera} className="size-4 cursor-pointer" />
                            </label>
                            <InputUpload
                                id="fileAvatar"
                                onChange={handleUploadAvatar}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-6 flex flex-col gap-4">
                <label>
                    <p className="text-lg text-gray-500 mb-2">Nome</p>
                    <Input
                        placeholder={userInfo.name}
                        value={nameField}
                        onChange={(e) => setNameField(e)}
                    />
                </label>
                <label>
                    <p className="text-lg text-gray-500 mb-2">Bio</p>
                    <TextArea
                        placeholder={userInfo.bio}
                        rows={4}
                        value={bioField}
                        onChange={(e) => setBioField(e)}
                    />
                </label>
                <label>
                    <p className="text-lg text-gray-500 mb-2">Link</p>
                    <Input
                        placeholder={userInfo.link}
                        value={linkField}
                        onChange={(e) => setLinkField(e)}
                    />
                </label>

                <Button onClick={handleClickEdit} label="Salvar alterações" size={1} />
            </section>
        </div>
    )
}