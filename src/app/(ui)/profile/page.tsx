"use client"
import {redirect} from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Page() {
  const {userInfo} = useContext(AuthContext);

   if(userInfo.slug !== undefined){
      redirect('/'+ userInfo.slug);
   }
   return null;
}