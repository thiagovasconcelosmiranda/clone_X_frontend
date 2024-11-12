"use client"
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../ui/button';
import { FormEvent, useContext, useEffect, useState } from 'react';
import apiTweet from '@/data/api-tweet';
import { api } from '@/data/api';
import { AuthContext } from '@/contexts/AuthContext';

export const TweetPost = () => {
  const [bodyValue, setBodyValue] = useState('');
  const { userInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo.slug) {
      setIsLoading(true);
    }
  }, []);

  const handleImageUpload = () => {
    alert()
  }

  const handlePostClick = async () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      if (bodyValue) {
        const res = await apiTweet.bodyTweet(token, bodyValue);
        console.log(res);
      }
    }
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    setBodyValue(e.currentTarget.innerHTML);
  }
  if (isLoading) {


    return (
      <div className="flex gap-6 py-8 border-b-2 border-gray-900">
        <div className="">
          <img
            crossOrigin='anonymous'
            src={`${api}/avatars/${userInfo.slug}/default.png`}
            alt={userInfo.name}
            className='size-12 rounded-full'
          />
        </div>

        <div className="flex-1">
          <div className="min-h-14 outline-none text-lg text-white empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)]"
            contentEditable
            role='textbox'
            data-placeholder="O que está acontecerndo?"
            onInput={onInput}
          >
          </div>
          <div className="flex justify-between items-center mt-2">
            <div onClick={handleImageUpload} className="cursor-pointer">
              <FontAwesomeIcon icon={faImage}
                className="size-6"
              />
            </div>
            <div className="w-28">
              <Button
                label="Postar"
                size={2}
                onClick={handlePostClick}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}