import { api } from "./api";

export default {
    getUserSlug: async (token: string |null, slug: string) =>{
        const req = await fetch(`${api}/user${slug}`, {
         method:'get',
         headers:{
           'Authorization':`Bearer ${token}`
         }
        });
        const json = await req.json();
        return json;
    },

    myTweets: async (token: string, slug: string) => {
       const req = await fetch(`${api}/user/${slug}/tweets`,{
        method:'get',
        headers:{
          'Authorization':`Bearer ${token}`
        }
       });
       const json = await req.json();
       return json;
    },

    userFollow: async (token: string | null, slug: string | undefined) => {
       const req = await fetch(`${api}/user/${slug}/follow`,{
        method: 'POST',
        headers:{
          'Authorization':`Bearer ${token}`
        }
       });
       const json = await req.json();
       return json;
    },

    userUpdate: async (token: string | null,  name: string, link: string, bio: string) => {
      const req = await fetch(`${api}/user`, {
        method: 'PUT',
        headers:{
          'Content-type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({name, link, bio})
      });
      const json = await req.json();
      return json;
    }
}