import {api} from "./api";

export default {
    search: async (token: string, q: string | undefined) => {
       const req = await fetch(`${api}/search?q=${q}`,{
        method: 'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
       });
       const json = await req.json();
       return json;
    }
}