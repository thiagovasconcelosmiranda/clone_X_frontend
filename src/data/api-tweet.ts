import { api } from "./api";

export default {
  privateping: async (token: string) => {
    const req = await fetch(`${api}/privateping`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await req.json();
    return json;
  },

  bodyTweet: async (token: string, body: string, image: any) => {
    const data = new FormData();
    data.append('body', body);
    data.append('image', image);

    const req = await fetch(`${api}/tweet`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });

    const json = await req.json();
    return json;
  },

  tweetId: async (token: string, id: number) => {
    const req = await fetch(`${api}/tweet/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const json = await req.json();
    return json;
  },

  tweetslug: async (token: string | null, slug: string) => {
    const req = await fetch(`${api}/user/${slug}/tweets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await req.json();
    return json;
  },

  addAnswer: async (token: string, body: string, id: number) => {
    let data = new FormData();
    data.append('body', body);
    
    const req = await fetch(`${api}/tweet/${id}/answer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });

    const json = await req.json();
    return json;
  }

}
