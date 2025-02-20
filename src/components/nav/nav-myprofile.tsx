"use client"
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import apiUser from '@/data/api-user';
import { User } from '@/types/user';
import verifyUrl from '@/utils/verify-url';
import accessUser from "../access/access-user";

export const NavMyProfile = () => {
    const [userX, setUserX] = useState<User>();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState("");
    let count = 0;

    useEffect(() => {
        count++;
        if (count == 1) {
            getUser();
        }
    }, []);



    const getUser = async () => {
        const user = accessUser.user();
        const res = await apiUser.getUserSlug(user.res.token, user.res.user.slug);
        
        /*
        if (!user.res.user.slug) {
            router.replace('/signin');
            return;
        }
        */

        setIsLoading(true);
        setAvatar(verifyUrl.avatar(res.user.avatar));
        setUserX(res.user);
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