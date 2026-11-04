import { atom } from "jotai";
import type { Mission } from "../types";

export const OpenMissions = atom<Mission[]>([])
export const ClosedMissions = atom<Mission[]>([])

