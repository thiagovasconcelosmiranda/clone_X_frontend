import { api } from "./api";

export default {
    newLike: async (token: string, id: number) => {
      const req = await fetch(`${api}/tweet/${id}/like`,{
           method:'POST',
           headers:{
              'Authorization':`Bearer ${token}`
           }
      });
      const json = await req.json();
      return json;
    }
}