"use client"
import { AnswerArea } from "@/components/answer/answer-area";
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { TextArea } from "@/components/ui/textarea";
import apiTweet from "@/data/api-tweet";
import { Tweet } from "@/types/tweet";
import { formatRelativeTime } from "@/utils/format-relative";
import verifyUrl from "@/utils/verify-url";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [tweet, setTweet] = useState<Tweet>();
    const params = useParams();
    const [avatar, setAvatar] = useState('');
    const [avatarUser, setAvatarUser] = useState('');

    useEffect(() => {
        findTweetId();
    }, []);

    const findTweetId = async () => {
        const token = sessionStorage.getItem('token');
        const id: any = params.slug;

        if (token && id) {
            const res = await apiTweet.tweetId(token, parseInt(id));
            if (res.id) {
                setTweet(res);
                setAvatar(verifyUrl.avatar(res.user.avatar));
                avatarUserItem();
                return;
            }
        }

    }

    const avatarUserItem = () => {
        const avatar = sessionStorage.getItem('avatar');
        setAvatarUser(verifyUrl.avatar(avatar));
    }

    return (
        <div>
            <GeneralHeader backHref="/home">
                <div className=" font-bold text-lg">{tweet?.user.slug}</div>
            </GeneralHeader>
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
                        <p>{tweet?.user.slug}  -  {formatRelativeTime(new Date())}</p>
                        <p>@thiago</p>
                    </div>
                </div>
                <div className="p-4 border-b-2 border-gray-400">
                    <p>{tweet?.body}</p>
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
                            <TextArea placeholder="Responder POST" />
                        </div>
                        <div className="w-72">
                            <Button label="Postar" size={2} />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-b-2 border-gray-400">
                  <AnswerArea />
                </div>
            </div>
        </div>
    )
}

