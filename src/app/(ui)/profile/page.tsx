"use client"
import accessUser from '@/utils/access-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
   const router = useRouter();

   useEffect(() => {
      const data = accessUser.user();

      if(data.user.slug){
         router.replace(`/${data.user.slug}`);
      }
   }, []);
   return null;
}