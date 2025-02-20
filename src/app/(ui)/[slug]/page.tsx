"use client"
import { ProfileFeed } from "@/components/profile/profile-feed";
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import userApi from '@/data/api-user';
import { useEffect, useState, useContext } from "react";
import { User } from '@/types/user';
import { AuthContext } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";
import apiUser from "@/data/api-user";
import verifyUrl from "@/utils/verify-url";
import apiTweet from "@/data/api-tweet";
import { TweetItem } from "@/components/tweet/tweet-item";

type UserI = {
    followersCount?: number,
    followingCount?: number,
    tweetCount: number,
    user: User
}

export default function Page() {
    const [isMe, setIsMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const [userI, setUserI] = useState<UserI>();
    const [following, setFollowing] = useState(false);
    const params = useParams();
    const token = sessionStorage.getItem('token');
    const host: any = params.slug;
    const [avatar, setAvatar] = useState('');
    const [cover, setCover] = useState('');
    const [tweet, setTweet] = useState([]);

    useEffect(() => {
        getUser();
    }, []);


    async function isMeData() {
        let slug = sessionStorage.getItem('slug');
        host === slug ? setIsMe(true) : setIsMe(false);
    }

    async function getUser() {
        if (token) {
            const res = await userApi.getUserSlug(token, host);
            if (!res.error) {
                setUserI(res);
                setAvatar(verifyUrl.avatar(res.user.avatar));
                setCover(verifyUrl.cover(res.user.cover));
                setIsLoading(true);
                isMeData();
                myTweet(res.user.slug);
                userFollow(res.user.slug);
            }
        }

        if (host === '/' + userInfo.slug) {
            setIsMe(false);
        }
    }

    const userFollow = async (slug2: string) => {
        const slug = sessionStorage.getItem('slug');
        const res = await apiUser.getUserSlug(token, slug);

        for (let followIndex in res.follows) {
            if (res.follows[followIndex] == slug2) setFollowing(true);
        }
    }

    const myTweet = async (slug: string) => {
        const res = await apiTweet.tweetslug(token, slug);

        if (res.tweets.length > 0) {
            for (let tweetIndex in res.tweets) {
                res.tweets[tweetIndex].user.avatar = verifyUrl.avatar(res.tweets[tweetIndex].user.avatar)
            }
            setTweet(res.tweets);
        }
    }

    const handleClickFollow = async () => {
        const res = await apiUser.userFollow(token, userI?.user.slug);
        setFollowing(res.following);
        getUser();
    }

    if (isLoading) {
        return (
            <div>
                <GeneralHeader backHref="/home">
                    <div className=" font-bold text-lg">{userI?.user.slug}</div>
                    <div className="text-xs text-gray-500">
                        {userI?.tweetCount} posts
                    </div>
                </GeneralHeader>
                <section className="border-b-2 border-gray-900">
                    <div className="bg-gray-500 h-28 overflow-hidden">
                        <img
                            crossOrigin="anonymous"
                            src={cover}
                            alt={userI?.user.name}
                            className=" w-full top-4 bg-current bg-center"
                        />
                    </div>
                    <div className="-mt-12 flex justify-between items-end px-6">
                        <img
                            crossOrigin="anonymous"
                            src={avatar}
                            alt={userI?.user.name}
                            className="size-24 rounded-full"
                        />
                        <div className="w-32">
                            {isMe &&
                                <Link href={`/${userI?.user.slug}/edit`}>
                                    <Button
                                        label="Editar perfil" size={2} />
                                </Link>
                            }

                            {!isMe &&
                                <Button label={following ? 'Deixar de seguir' : 'Seguir'} size={2} onClick={handleClickFollow} />
                            }
                        </div>
                    </div>
                    <div className="px-6 mt-4">
                        <div className="text-xl font-bold">{userI?.user.name}</div>
                        <div className="text-gray-500">@{userI?.user.slug}</div>
                        <div className="py-5 text-lg text-gray-500">{userI?.user.bio}</div>
                        {userI?.user.link &&
                            <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faLink} className="size-6" />
                                <Link href={userI?.user.link} target="_blank" className="text-blue-300">{userI?.user.link}</Link>
                            </div>
                        }
                        <div className="my-5 flex gap-6">
                            <div className="text-xl text-gray-500 "><span className="text-white">{ }</span> {userI?.followingCount} Seguindo</div>
                            <div className="text-xl text-gray-500 "><span className="text-white">{ }</span>{userI?.followersCount} Seguidores</div>
                        </div>
                    </div>
                </section>
                <ProfileFeed slug={userI?.user.slug} />
                {tweet.map((item, k) => (
                    <TweetItem key={k} tweet={item} />
                ))}
            </div>
        )
    }
}

