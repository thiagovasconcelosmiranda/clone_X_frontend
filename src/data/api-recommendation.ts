import { api } from '@/data/api';

export default {
   suggestions: async (token: string) => {
      const req = await fetch(`${api}/suggestions`, {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      });
      const json = await req.json();
      return json;
   }
}