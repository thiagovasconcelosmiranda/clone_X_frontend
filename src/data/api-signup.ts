import { api } from "./api";

export default {
    signup: async (name: string, email: string, password: string) => {
        let data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);

        const req = await fetch(`${api}/auth/signup`, {
            method: 'POST',
            body: data
        });
        const json = await req.json();
        return json;
    }
}