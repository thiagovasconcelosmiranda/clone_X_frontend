"use client"
import { user } from '@/data/user';
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import apiUser from '@/data/api-user';
import { User } from '@/types/user';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/data/api';

export const NavMyProfile = () => {
    const [userX, setUserX] = useState<User>();
    const { setUserInfo } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = window.sessionStorage.getItem('token');
        const slug = '/' + window.sessionStorage.getItem('slug');

        if (slug && token) {
            const res = await apiUser.getUserSlug(token, slug);
            if (res) {
                setIsLoading(true);
                setUserInfo(res.user);
                setUserX(res.user);
            }

        } else {
            router.replace('/signin');
        }
    }
    if (isLoading) {
        return (
            <div className='flex items-center'>
                <div className='size-10 mr-2 rounded-full overflow-hidden'>
                    <Link href={`/${userX?.slug}`}>
                        <img
                            crossOrigin='anonymous'
                            src={`${api}/avatars/${userX?.slug}/default.png`}
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