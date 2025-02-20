"use client"
import { RecommendationItem, RecommendationItemSkeleton } from "./recommendation-Item"
import { useEffect, useState } from "react";
import apiRecommendation from '@/data/api-recommendation';

export const RecommendationArea = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [skeleton, setSkeleton] = useState(true);

    useEffect(() => {
        getSuggestions();
    }, []);

    const getSuggestions = async () => {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            const res = await apiRecommendation.suggestions(token);
            if (res.users.length > 0) {
                setSuggestions(res.users);
                setTimeout(() => {
                    setSkeleton(false);
                });
            }
        }
    }

    return (
        <div className="bg-gray-700 rounded-3xl">
            <h2 className="text-xl p-6">Quem seguir</h2>
            <div className="flex flex-col gap-4 p-6 pt-0">
                {suggestions && (
                    <>
                        {suggestions.map((item, k) => (
                            <div key={k}>
                                {skeleton ? (
                                    <RecommendationItemSkeleton />
                                ) : (
                                    <RecommendationItem user={item} />
                                )}

                            </ div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}