"use client"
import { Logo } from "@/components/ui/logo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      router.replace('/home');
    } else {
      router.replace('/signin');
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Logo size={80} />
    </div>
  )
}