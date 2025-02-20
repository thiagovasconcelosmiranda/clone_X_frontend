
export default {
   user: () => {
      const data = window.sessionStorage.getItem('user');
      if (data) {
         const user = JSON.parse(data);
         return user;
      }

   }
}