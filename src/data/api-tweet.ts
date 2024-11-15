import { api } from "./api";

export default {
    privateping: async (token: string) => {
        const req = await fetch(`${api}/privateping`, {
            method:'get',
            headers: {
                'Authorization':`Bearer ${token}`
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
           headers:{
             'Authorization':`Bearer ${token}`
           },
           body: data
        });

        const json = await req.json();
        return json;
    }

    
}
