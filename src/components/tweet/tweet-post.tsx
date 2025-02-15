"use client"
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../ui/button';
import { FormEvent, useEffect, useState } from 'react';
import apiTweet from '@/data/api-tweet';
import { InputUpload } from '../ui/input';
import verifyUrl from '@/utils/verify-url';
import apiUser from '@/data/api-user';
import { User } from '@/types/user';
import { AlertForm } from '../ui/alert-form';

export const TweetPost = () => {
  const [bodyValue, setBodyValue] = useState('');
  const [file, setFile] = useState(null);
  const [nameFile, setNameFile] = useState('');
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState('');
  const [visibleAlert, setVisibleAlert] = useState(false)

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = await sessionStorage.getItem('token');
    const slug = await sessionStorage.getItem('slug');

    if (token && slug) {
      const res = await apiUser.getUserSlug(token, slug);
      setAvatar(verifyUrl.avatar(res.user.avatar));
      setUser(res.user);
    }
  }

  const handlePostClick = async () => {
    const token = window.sessionStorage.getItem('token');

    if (token) {
      if (bodyValue) {
        const res = await apiTweet.bodyTweet(
          token,
          bodyValue,
          file
        );

        if (res.id > 0) {
          setVisibleAlert(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e);
    setNameFile(e.name);
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    setBodyValue(e.currentTarget.innerHTML);
  }
  return (
    <>
      <div className="flex gap-6 py-8 border-b-2 border-gray-900">
        <div className="">

          {user?.slug && (
            <img
              crossOrigin='anonymous'
              src={avatar}
              alt={user?.name}
              className='size-12 rounded-full'
            />
          )}
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
            <div>
              <InputUpload
                id='file'
                onChange={handleFileChange}
              />


              <label htmlFor="file" className="flex gap-3">
                <FontAwesomeIcon icon={faImage}
                  className="size-6 cursor-pointer"
                />
                <div className="text-white">{nameFile}</div>
              </label>
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
        {visibleAlert && (
          <AlertForm msg='Post enviado!'/>
        )}
      </div>
    </>
  )
}
