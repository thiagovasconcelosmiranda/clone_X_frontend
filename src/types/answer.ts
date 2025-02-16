import { User } from "./user";

export type Answer = {
    id: string
    body: string
    image: string
    user: User,
    createAt: Date
}