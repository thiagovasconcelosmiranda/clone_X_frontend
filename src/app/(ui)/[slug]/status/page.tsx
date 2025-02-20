"use client"
import { AnswerItem } from "@/components/answer/answer-item";
import { AnswerSkeleton } from "@/components/answer/answer-skeleton";
import { AlertForm } from "@/components/ui/alert-form";
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { TextArea } from "@/components/ui/textarea";
import apiTweet from "@/data/api-tweet";
import { Tweet } from "@/types/tweet";
import accessUser from "@/utils/access-user";
import { formatRelativeTime } from "@/utils/format-relative";
import verifyUrl from "@/utils/verify-url";
import { faComment, faHeart, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [tweet, setTweet] = useState<Tweet>();
    const params = useParams();
    const [avatar, setAvatar] = useState('');
    const [avatarUser, setAvatarUser] = useState('');
    const [answer, setAnswer] = useState([]);
    const [skeleton, setSkeleton] = useState(false);
    const [bodyValue, setBodyValue] = useState('');
    const id: any = params.slug;
    const [token, setToken] = useState('');
    const [alertPost, setAlertPost] = useState(false);

    useEffect(() => {
        findTweetId();
    }, []);

    const findTweetId = async () => {
        const data = accessUser.user();
        setSkeleton(true);

        if (data.token && id) {
            setToken(data.token);
            const res = await apiTweet.tweetId(data.token, parseInt(id));
            if (res.id) {
                setTweet(res);
                setAvatar(verifyUrl.avatar(res.user.avatar));
                avatarUserItem();
                setAnswer(res.answers);
                setSkeleton(true);

                setTimeout(() => {
                    setSkeleton(false);
                }, 8000);
                return;
            }
        }
    }

    const avatarUserItem = () => {
        const avatar = sessionStorage.getItem('avatar');
        setAvatarUser(verifyUrl.avatar(avatar));
    }

    const handleButtonBody = async () => {
        if (id && token) {
            const res = await apiTweet.addAnswer(token, bodyValue, id);
            if (res.id) {
                setBodyValue("");
                findTweetId();
                setAlertPost(true);
                setTimeout(() => { setAlertPost(false) }, 10000);
            }
        }
    }

    return (
        <div>
            <GeneralHeader backHref="/home">
                <div className=" font-bold text-lg">{tweet?.user.slug}</div>
            </GeneralHeader>
            {alertPost && (
                <AlertForm msg="Poste enviado" />
            )}

            <div className="">
                <div className=" border-b-2 border-gray-400 p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex justify-center items-center">
                        <img
                            src={avatar}
                            alt={tweet?.user.slug}
                            crossOrigin='anonymous'
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <p>{tweet?.user.slug}  -  {tweet?.createAt ? formatRelativeTime(new Date(tweet?.createAt)) : ''}</p>
                        <p>@thiago</p>
                    </div>
                </div>
                <div className="p-4 border-b-2 border-gray-400">
                    <p>{tweet?.body}</p>
                </div>
                <div className="w-full flex mt-6 p-2 text-gray-500 justify-between items-center">
                    <div className="w-full">
                        <div className="inline-flex items-center gap-2 cursor-pointer">
                            <FontAwesomeIcon
                                icon={faComment}
                                className="size-6"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="inline-flex items-center gap-2 cursor-pointer">
                            <FontAwesomeIcon
                                icon={faRetweet}
                                className="size-6"
                            />
                            <div className="text-lg"></div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`inline-flex items-center gap-2 cursor-pointer`}>
                            <FontAwesomeIcon
                                icon={faHeart} />
                        </div>
                    </div>
                </div>
                <div className="p-4 border-b-2 border-gray-400">
                    <div className=" w-full flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full flex justify-center items-center">
                            <img
                                src={avatarUser}
                                crossOrigin='anonymous'
                                className="rounded-full"
                            />
                        </div>
                        <div className="w-full">
                            <TextArea
                                placeholder="Responder POST"
                                value={bodyValue}
                                onChange={(e) => setBodyValue(e)}
                            />
                        </div>
                        <div className="w-72">
                            <Button
                                label="Postar"
                                size={2}
                                onClick={handleButtonBody}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-4 border-b-2 border-gray-400">

                    {answer.map((item, k) => (
                        <div key={k} className="gap-12 mt-14 p-4">
                            {skeleton ? (
                                <AnswerSkeleton />
                            ) :
                                (
                                    <AnswerItem answer={item} />
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

