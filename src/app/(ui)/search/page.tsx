"use client"
import { TweetItem } from "@/components/tweet/tweet-item";
import { GeneralHeader } from "@/components/ui/general-header";
import { SearchInput } from "@/components/ui/search-input";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import apiSearch from '@/data/api-search';
import accessUser from "@/utils/access-user";

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
     const data =  accessUser.user();
     if(data.token){
        const res = await apiSearch.search(data.token, searchParams.q);
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