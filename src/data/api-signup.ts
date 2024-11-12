import { api } from "./api";

export default {
    signup: async (name: string, email: string, password: string) => {
        const req = await fetch(`${api}/auth/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await req.json();
        return json;
    }
}