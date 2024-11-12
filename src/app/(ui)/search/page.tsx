"use client"
import { TweetItem } from "@/components/tweet/tweet-item";
import { GeneralHeader } from "@/components/ui/general-header";
import { SearchInput } from "@/components/ui/search-input";
import { tweet } from "@/data/tweet";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import apiSearch from '@/data/api-search';

type Props = {
 searchParams: {
    q: string | undefined;
 }
}

export default function Page({searchParams}: Props){
const [tweets, setTweets] = useState([]);
   if(!searchParams.q) redirect('/');

   useEffect(()=>{
    search();
   },[]);

   const search = async () =>{
     const token = window.sessionStorage.getItem('token');
     if(token){
        const res = await apiSearch.search(token, searchParams.q);
        setTweets(res.tweets);
     }
   }

    return (
        <div>
            <GeneralHeader backHref="/">
               <SearchInput defaultValue={searchParams.q}/>
            </GeneralHeader>
            <div className=" border-t-2 border-gray-900">
               {tweets.map((item, k)=>(
                  <TweetItem key={k} tweet={item}/>
               ))}
            </div>
        </div>
    )
}