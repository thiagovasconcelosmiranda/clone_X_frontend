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

    bodyTweet: async (token: string, body: string) => {
        const req = await fetch(`${api}/tweet`, {
           method: 'POST',
           headers:{
             'Content-type':'application/json',
             'Authorization':`Bearer ${token}`
           },
           body: JSON.stringify({body})
        });

        const json = await req.json();
        return json;
    }

    
}
