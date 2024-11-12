"use client"
import { TweetItem } from "@/components/tweet/tweet-item"
import { useEffect, useState } from 'react';
import apiFeed from "@/data/api-feed";

export const HomeFeed = () => {
    const [listFeed, setListFeed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getFeed();

    }, []);

    const getFeed = async () => {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            const res = await apiFeed.getfeed(token);
            if(res){
                setListFeed(res.tweets);
                setIsLoading(true);
            }

        }
    }

    if (isLoading) {    
        return (
            <div>
                {listFeed.map((item, k) => (
                    <TweetItem key={k} tweet={item} />
                ))}
            </div>
        )
    }
}