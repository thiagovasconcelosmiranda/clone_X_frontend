"use client"
import { TweetItem, TweetItemSkeleton } from "@/components/tweet/tweet-item"
import { useEffect, useState } from 'react';
import apiFeed from "@/data/api-feed";
import verifyUrl from "@/utils/verify-url";
import { AnswerPost } from "@/components/answer/answer-post";
import Link from "next/link";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export const HomeFeed = () => {
    const [listFeed, setListFeed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skeleton, setSkeleton] = useState(true);

   useEffect(()=>{
     getFeed();
   },[]);

    const getFeed = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const res = await apiFeed.getfeed(token);
            if (res.tweets) {
                setListFeed(res.tweets);
                setIsLoading(true);

                for (let tweetIndex in res.tweets) {
                    res.tweets[tweetIndex].user.avatar = verifyUrl.avatar(res.tweets[tweetIndex].user.avatar);
                }
                setTimeout(() => {
                    setSkeleton(false);
                }, 2000);
            }
        }
    }

    if (isLoading) {
        return (
            <div>
                {listFeed.map((item, k) => (
                    <div key={k} className="gap-12 mt-14 p-4">
                        {skeleton ? (
                            <TweetItemSkeleton />
                        ) :
                            (
                                <TweetItem key={k} tweet={item} />
                            )}
                    </div>
                ))}
            </div>
        )
    }
}