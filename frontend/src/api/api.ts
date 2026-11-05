import axios from "axios"
import type { Mission, User, UserWithMission } from "../types"

const apiUsers = axios.create({ baseURL: "http://localhost:3000/users" })


async function getUserByEmailAndPwd(values: User): Promise<UserWithMission | undefined> {
    try {
        const response = await apiUsers.post("/login", values)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

async function createNewUser(data: User): Promise<User | undefined> {
    try {
        const response = await apiUsers.post("", data)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

async function updateUser(id: number, data: User) {
    try {
        const response = await apiUsers.put(`/${id}`, data)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

export { getUserByEmailAndPwd, createNewUser, updateUser }