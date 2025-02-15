"use client"

import { Tweet } from "@/types/tweet"
import { useEffect, useState } from "react"
import { AnswerItem } from "./answer-item"

type props = {
  tweet: Tweet
}
export const AnswerArea = () => {
    const [answers, setAnswers] = useState([]);

     useEffect(()=>{
     },[]);

    return(
        <div>
            {answers.map((item, k)=>(
                <AnswerItem/>
            ))}

        </div>
    )
}