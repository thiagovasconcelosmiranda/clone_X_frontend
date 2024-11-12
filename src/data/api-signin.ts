import { api } from "./api";


export default {
    ping: async () =>{
      const req = await fetch(`${api}/ping`,{
        method: 'get'
      });
      const json = await req.json();
      return json;
    },
 
    signin: async (email: string, password: string) => {
        const req = await fetch(`${api}/auth/signin`, {
           method: 'POST',
           headers:{
             Accept: 'application/json',
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({email, password})
        });
 
        const json = await req.json();
        return json;
    }
 }