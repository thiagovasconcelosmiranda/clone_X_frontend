"use client"
import accessUser from '@/components/access/access-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
   const router = useRouter();

   useEffect(() => {
      const user = accessUser.user();

      if(user.res.user.slug){
         router.replace(`/${user.res.user.slug}`);
      }
   }, []);
   return null;
}