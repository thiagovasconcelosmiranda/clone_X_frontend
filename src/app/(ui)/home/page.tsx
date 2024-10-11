import { TweetPost } from "@/components/tweet/tweet-post";
import { HomeHeader } from "../../../components/home/home-header";
import { HomeFeed } from "./home-feed";

export default function Page () {
   return (
    <div>
        <HomeHeader/>
        <TweetPost/>
        <HomeFeed/>
    </div>
   )
}