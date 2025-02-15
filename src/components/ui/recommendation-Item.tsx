"use client"
import { User } from "@/types/user"
import Link from "next/link";
import { Button } from "./button";
import { use, useContext, useEffect, useState } from "react";
import apiUser from "@/data/api-user";
import verifyUrl from "@/utils/verify-url";
import { useRouter } from "next/navigation";

type Props = {
    user: User;
}


export const RecommendationItem = ({ user }: Props) => {
    const [following, setFollowing] = useState(true);
    const token = window.sessionStorage.getItem('token');
    const [avatar, setAvatar] = useState('');
    const router = useRouter();
    let count = 0;

    useEffect(() => {
        count++;
        if (count === 1){
            follows();
            setAvatar(verifyUrl.avatar(user.avatar));
        } 
    }, []);

    const handleFollowButton = async () => {
        const res = await apiUser.userFollow(token, user.slug);
        setFollowing(res.following);
    }

    const follows = async () => {
        const slug = sessionStorage.getItem('slug');
        const res = await apiUser.getUserSlug(token, slug);
        
        if (res.follows.length > 0) {
            for(let slugIndex in res.follows){
                res.follows[slugIndex] === user.slug ? setFollowing(false) : setFollowing(true);
            }
        }
    }

    const handleFollowLink = () => {
        router.replace(`/${user.slug}/edit`);
    }

    return (
        <div className="flex items-center">
            <div className="size-10 mr-2 rounded-full overflow-hidden">
                <Link href={`/${user.slug}`}>
                    <img
                        crossOrigin='anonymous'
                        src={avatar}
                        alt={user.name}
                        className="size-full"
                    />
                </Link>
            </div>
            <div className="flex-1 overflow-hidden">
                <Link href={user.slug}
                    className="block truncate">
                    <div className="truncate text-sm">{user.name}</div>
                    <div className="truncate text-sm text-gray-400">@{user.slug}</div>
                </Link>
            </div>
            <div className="pl-2 w-20">

                {following && (
                    <Button
                        label="Seguir"
                        onClick={handleFollowButton}
                        size={3}
                    />
                )}
            </div>
        </div>
    );
}


export const RecommendationItemSkeleton = () => {
    return (
        <div className="animate-pulse flex items-center">
            <div className="size-10 mr-2 rounded-full bg-gray-600"></div>
            <div className="flex-1 flex flex-col gap-1 ">
                <div className="bg-gray-600 w-3/4 h-4" ></div>
                <div className="bg-gray-600 w-1/4 h-4" ></div>
            </div>
        </div>
    )
}