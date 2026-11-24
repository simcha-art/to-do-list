import { atom, useAtom } from "jotai";
import type { Mission } from "../types";

export const missionsAtom = atom<Mission[]>([])

export const openMissions = atom<Mission[]>((get) => get(missionsAtom).filter(m => !m.is_finished))
export const closedMissions = atom<Mission[]>((get) => get(missionsAtom).filter(m => m.is_finished))

export function addMission(new_mission: Mission) {
    const [missions, setMissions] = useAtom(missionsAtom)
    setMissions([...missions, new_mission])
}

export function removeMission(mission_id: number) {
    const [missions, setMissions] = useAtom(missionsAtom)
    setMissions([...missions.filter(m => m.id !== mission_id)])
}

export function updateMission(mission: Mission) {
    const [missions, setMissions] = useAtom(missionsAtom)
    setMissions([...missions.map(m => m.id === mission.id ? mission: m)])
}