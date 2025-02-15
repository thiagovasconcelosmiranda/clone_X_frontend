"use client"
import {TweetItem} from "../tweet/tweet-item";
import { useEffect, useState } from "react";
import apiMyTweets from '@/data/api-user';

type Props ={
    slug: any,
}
export const ProfileFeed = ({ slug }: Props) => {
    const [tweets, setTweets ] = useState([]);

    useEffect(()=>{
      getMyTweets();
    },[]);

    const getMyTweets = async () => {
        const token = localStorage.getItem('token');
        if(token){
            const res = await apiMyTweets.myTweets(token, slug);
            setTweets(res.tweets);
        }
    }

    return (
        <div>
            {tweets.map((item, k) => (
             <TweetItem key={k} tweet={item}/>
            ))}
        </div>
    );
}
