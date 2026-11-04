import { atom } from "jotai"
import type { User } from "../types"

export const UserAtom = atom<User>({id: 0, name: "", email: ""})