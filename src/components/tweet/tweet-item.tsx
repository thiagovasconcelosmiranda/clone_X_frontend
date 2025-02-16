"use client"
import { Tweet } from "@/types/tweet";
import { formatRelativeTime } from "@/utils/format-relative";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet, faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/data/api";
import apiLike from "@/data/api-like";
import { AnswerPost } from "../answer/answer-post";

type Props = {
    tweet: Tweet,
    hideComments?: boolean
}

export const TweetItem = ({ tweet, hideComments }: Props) => {
    const [like, setLike] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);

    useEffect(() => {
        verifyLink();
    }, []);

    const verifyLink = () => {
        const slug = sessionStorage.getItem('slug');
        for (let likeIndex in tweet.likes) {
            if (tweet.likes[likeIndex].userSlug === slug) {
                setLike(true);
            }
        }
    }

    const handleLikeButton = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const res = await apiLike.newLike(token, tweet.id);
            setLike(res.like);
        }
    }

    return (

        <div className="flex gap-2 p-6 border-b-2 border-gray-900">
            <div>
                <Link href={`/user/${tweet.user.slug}`}>
                    <img
                        crossOrigin='anonymous'
                        src={tweet.user.avatar}
                        alt={tweet.user.name}
                        className="size-10 rounded-full"
                    />
                </Link>
            </div>
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3">
                    <div className="">
                        <Link href={`/${tweet.user.slug}`}>
                            {tweet.user.name}
                        </Link>
                    </div>
                    <div className="text-xs text-gray-500">@{tweet.user.slug} - {formatRelativeTime(new Date(tweet.createAt)
                    )}</div>
                </div>
                <Link href={`/${tweet.id}/status`}>
                    <div className="py-4 text-lg">{tweet.body}</div>
                </Link>
                {tweet.image &&
                    <div className="w-full">
                        <img
                            crossOrigin='anonymous'
                            src={`${api}/posts/${tweet.user.slug}/${tweet.id}/${tweet.image}`}
                            className="w-full rounded-2xl"
                        />
                    </div>
                }
                <div className="flex mt-6 text-gray-500">
                    {!hideComments &&
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faComment}
                                    className="size-6"
                                    onClick={() => setIsAnswer(true)}
                                />
                                <div className="text-lg">{tweet.answers.length}</div>
                            </div>

                        </div>
                    }
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 cursor-pointer">
                            <FontAwesomeIcon
                                icon={faRetweet}
                                className="size-6"
                            />
                            <div className="text-lg"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div onClick={handleLikeButton} className={`inline-flex items-center gap-2 cursor-pointer ${like && 'text-red-400'}`}>
                            <FontAwesomeIcon
                                icon={like ? faHeartFilled : faHeart} />
                            <div className="text-lg">{tweet.likes.length}</div>
                        </div>
                    </div>
                </div>
            </div>
            <AnswerPost
                tweet={tweet}
                active={isAnswer} onClick={() => setIsAnswer(false)} />
        </div>
    )
}

export const TweetItemSkeleton = () => {
    return (
        <div className="animate-pulse flex items-center">
            <div className="size-10 mr-2 rounded-full bg-gray-600"></div>
            <div className="flex-1 flex flex-col gap-1 ">
                <div className="bg-gray-600 w-3/4 h-4"></div>
                <div className="bg-gray-600 w-1/4 h-4"></div>
                <div className="bg-gray-600 w-1/4 h-4"></div>
            </div>
        </div>
    )
}