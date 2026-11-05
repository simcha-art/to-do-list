export interface User {
    id?: number,
    name?: string,
    email?: string, 
    password?: string
}

export interface Mission {
    id: number,
    title: string,
    desc: string,
    date: string,
    finished: boolean,
    created_at: string,
    user_id: number
}

export interface UserWithMission extends User {
    missions: Mission[]
}
