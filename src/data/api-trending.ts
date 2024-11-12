import { api } from "./api";

export default {
    getTrending: async (token: string | null) => {
        const req = await fetch(`${api}/trending`, {
            method: 'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        const json = await req.json();
        return json;
       
    }
}