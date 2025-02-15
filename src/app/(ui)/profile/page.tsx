"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
   const router = useRouter();

   useEffect(() => {
      const slug = sessionStorage.getItem('slug');

      if(slug !== undefined){
         router.replace(`/${slug}`);
      }
   }, []);
   return null;
}