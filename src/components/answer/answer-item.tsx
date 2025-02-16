import { Answer } from "@/types/answer";
import { formatRelativeTime } from "@/utils/format-relative";
import verifyUrl from "@/utils/verify-url";
import { faComment, faHeart, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type props = {
    answer?: Answer
}

export const AnswerItem = ({ answer }: props) => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setAvatar(verifyUrl.avatar(answer?.user.avatar));
        console.log(answer?.createAt)
    }, []);

    return (
        <div className=" border-b-2 border-gray-400">
            <div className="w-full flex items-center p-4 gap-4">
                <div className="w-10 h-10 rounded-full bg-white ">
                    <img src={avatar}
                        crossOrigin='anonymous'
                        alt={answer?.user.slug}
                    />
                </div>
                <div className="">
                    <p>{answer?.user.slug}  -  {answer?.createAt ? formatRelativeTime(new Date(answer.createAt)) : ''}</p>
                    <p>@{answer?.user.slug}</p>
                </div>
            </div>
            <div>
                <p>{answer?.body}</p>
            </div>
            <div className=" w-full mt-6 flex justify-center items-center text-gray-500">
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
        </div>
    )
}


