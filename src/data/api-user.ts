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
    },
    updateAvatar: async (token: string, slug: string, avatar: any) => {
      const data = new FormData();
      data.append('slug', slug);
      data.append('avatar', avatar);

      const req = await fetch(`${api}/user/avatar`,{
        method:'PUT',
        headers: {
           'Authorization':`Bearer ${token}`
        },
        body: data
      });
      const json = await req.json();
      return json;
    },

    updateCover: async (token: string, slug: string, cover: any) => {
      const data = new FormData();
      data.append('slug', slug);
      data.append('cover', cover);

      const req = await fetch(`${api}/user/cover`, {
        method:'PUT',
        headers: {
           'Authorization':`Bearer ${token}`
        },
        body: data
      });
      const json = await req.json();
      return json;
    }
}