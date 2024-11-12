"use client"
import { useEffect, useState } from "react";
import { TrendingItem, TrendingItemSkeleton } from "./trending-item"
import apiTrending  from '@/data/api-trending';

export const TrendingArea = () => {
   const [listTrending, setListTrending] = useState([]);
   const [skeleton, setSkeleton] = useState(true);

   useEffect(()=>{
     getFeed();
   },[]);

   const  getFeed = async () =>{
      const token = window.sessionStorage.getItem('token');
      const res = await apiTrending.getTrending(token);

      setTimeout(()=>{
        setSkeleton(false);
      }, 1000);
      setListTrending(res.trends);
   }

    return (
        <div className="bg-gray-700 rounded-3xl">
           <h2 className="text-xl p-6">O que está acontecendo?</h2>
           <div className="flex flex-col gap-4 p-6 pt-0">
           
            {listTrending.map((item, k) =>(
             <div key={k}>  
                {skeleton ? (
                  <TrendingItemSkeleton />
                ) : (
                  <TrendingItem label={`${item['hashtag']}`} count={item['counter']}/>
                )}
             </ div>
            
            ))}

            
             
           </div>
        </div>
    )
}