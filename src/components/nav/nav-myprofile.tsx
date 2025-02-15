"use client"
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import apiUser from '@/data/api-user';
import { User } from '@/types/user';
import { AuthContext } from '@/contexts/AuthContext';
import verifyUrl from '@/utils/verify-url';

export const NavMyProfile = () => {
    const [userX, setUserX] = useState<User>();
    const { setUserInfo } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState("");
    let count = 0;

    useEffect(() => {
        count++;
        if(count == 1){
            getUser();
        }
    }, []);


   
    const getUser = async () => {
        const token = sessionStorage.getItem('token');
        const slug = sessionStorage.getItem('slug');
       
        if (slug && token) {
            const res = await apiUser.getUserSlug(token, slug);
         
            if (res.user.slug) {
                setIsLoading(true);
                setAvatar(verifyUrl.avatar(res.user.avatar));
                setUserX(res.user);
                getTweet(token, slug);

                setUserInfo(res);
            }

        } else {
            router.replace('/signin');
        } 
    }
    const getTweet = async (token: string, slug: string) => {
       
    }

    if (isLoading) {
        return (
            <div className='flex items-center'>
                <div className='size-10 mr-2 rounded-full overflow-hidden'>
                    <Link href={`/${userX?.slug}`}>

                    <img
                            crossOrigin='anonymous'
                            src={avatar}
                            alt={userX?.name}
                            className='size-full'
                        />
                    </Link>
                </div>
                <div className='flex-1 overflow-hidden'>
                    <Link href={`/${userX?.slug}`} className='block truncate'>
                        {userX?.name}
                    </Link>
                    <div className='text-sm text-gray-400 truncate'>@{userX?.slug}</div>
                </div>
            </div>
        )
    }
}