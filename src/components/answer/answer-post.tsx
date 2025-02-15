import { Tweet } from "@/types/tweet"
import { formatRelativeTime } from "@/utils/format-relative"
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import apiUser from "@/data/api-user"
import { useEffect, useState } from "react"
import verifyUrl from "@/utils/verify-url"
import { TextArea } from "../ui/textarea"
import { Button } from "../ui/button"
import apiTweet from "@/data/api-tweet"
import { AlertForm } from "../ui/alert-form"
import { InputUpload } from "../ui/input"

type props = {
    tweet: Tweet
    active: boolean
    onClick: () => void
}
export const AnswerPost = ({ tweet, active, onClick }: props) => {
    const [avatar, setAvatar] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const [token, setToken] = useState('');
    const [activeAlert, setActiveAlert] = useState(false);
    const [nameFile, setNameFile] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const slug = sessionStorage.getItem('slug');
        const token = sessionStorage.getItem('token');

        if (slug && token) {
            setToken(token);
            const res = await apiUser.getUserSlug(token, slug);
            if (res.user.slug) {
                setAvatar(verifyUrl.avatar(res.user.avatar));
            }
        }
    }

    const handleEnterButton = async () => {
        if (token) {
            const res = await apiTweet.addAnswer(token, bodyValue, tweet.id);
            if (res.id) {
                setBodyValue("");
                setActiveAlert(true);

                setTimeout(() => {
                    setActiveAlert(false);
                }, 10000);
                return;
            }
            setActiveAlert(false);
        }

    }
    const handleButtonUpload = (e: any) => {
        console.log(e)
        setNameFile(e.name);
    }

    return (
        <div className={`w-96 h-auto p-4 bg-gray-700 fixed z-50 top-52 left-0 right-0 m-auto rounded-3xl ${active ? '' : 'hidden'}`}>
            {activeAlert && (
                <AlertForm msg="Post enviado!" />
            )}

            <div className=" flex justify-between">
                <FontAwesomeIcon icon={faXmark} className="size-6 cursor-pointer" onClick={onClick} />
                <p>Rascunho</p>
            </div>
            <div className="pt-4 flex gap-3">
                <div className="w-12 h-12 rounded-full flex justify-start items-start">
                    <img
                        crossOrigin='anonymous'
                        src={tweet.user.avatar}
                        alt={tweet.user.name}
                        className="size-10 rounded-full"
                    />
                </div>
                <div>
                    <p className="font-bold">{tweet.user.slug}</p>
                    <p>{tweet.body}  -  {formatRelativeTime(new Date(tweet.createAt))}</p>
                </div>
            </div>
            <div className="flex p-4 items-center gap-2">
                <p className="text-gray-400">Respondendo a </p>
                <p className="text-blue-500">@{tweet.user.slug}</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex justify-center items-center mb-4">
                    <img
                        crossOrigin='anonymous'
                        src={avatar}
                        alt={tweet.user.name}
                        className="size-10 rounded-full"
                    />
                </div>
                <TextArea placeholder="Postar sua resposta" value={bodyValue} onChange={(e) => setBodyValue(e)} />
            </div>
            <div className="flex justify-between items-center gap-3 w-full mt-4">
                <label htmlFor="file">
                    <div className="flex gap-3 w-52">
                        <FontAwesomeIcon icon={faImage} className="size-6 cursor-pointer" />
                    </div>
                </label>
                <InputUpload
                    onChange={handleButtonUpload}
                    id="file"
                />
                <Button label='Postar'
                    size={2}
                    onClick={handleEnterButton}
                />
            </div>
        </div>
    )
}