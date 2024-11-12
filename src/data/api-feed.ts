import { api } from "./api";

export default {
    getfeed: async (token: any) =>{
        const req = await fetch(`${api}/feed`, {
           method: 'GET'  ,
           headers:{
            'Authorization':`Bearer ${token}`
           }
        });
        const json = await req.json();
        return json;
    }
}