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
      let data = new FormData();

      data.append('email', email);
      data.append('password', password);

        const req = await fetch(`${api}/auth/signin`, {
           method: 'POST',
           body: data
        });
 
        const json = await req.json();
        return json;
    }
 }