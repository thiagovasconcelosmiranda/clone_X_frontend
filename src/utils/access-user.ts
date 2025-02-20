export default {
    user: () => {
        const data = sessionStorage.getItem('user');
        if(!data) return;
        return JSON.parse(data);
    }
}