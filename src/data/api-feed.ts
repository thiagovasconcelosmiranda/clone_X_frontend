import { api } from "./api";

export default {
    getfeed: async (token: string) =>{
       const req = await fetch(`${api}/feed`, {
         headers: {
            "Authorization":`Bearer ${token}`
         }
       });  
       const json = await req.json();
       return json;
    }
}