"use client"
import { TweetItem, TweetItemSkeleton } from "@/components/tweet/tweet-item";
import { GeneralHeader } from "@/components/ui/general-header";
import { SearchInput } from "@/components/ui/search-input";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import apiSearch from '@/data/api-search';
import accessUser from "@/components/access/access-user";

type Props = {
   searchParams: {
      q: string | undefined;
   }
}

export default function Page({ searchParams }: Props) {
   const [tweets, setTweets] = useState([]);
   const [skeleton, setSkeleton] = useState(false);
   if (!searchParams.q) redirect('/');

   useEffect(() => {
      search();
   }, []);

   const search = async () => {
      setSkeleton(true);

      const user = accessUser.user();

      if (user.res.token) {
         const res = await apiSearch.search(user.res.token, searchParams.q);
         if (res.tweets.length === 0) return;
         setSkeleton(false);
         setTweets(res.tweets);
      }
   }


   return (
      <div>
         <GeneralHeader backHref="/">
            <SearchInput defaultValue={searchParams.q} />
         </GeneralHeader>
         <div className=" border-t-2 border-gray-900">
            {tweets.map((item, k) => (
               <div key={k} className="gap-12 mt-14 p-4">
                  {skeleton ? (
                     <TweetItemSkeleton />
                  ) : (
                     <TweetItem tweet={item} />
                  )}
               </div>
            ))}
         </div>
      </div>
   )
}

