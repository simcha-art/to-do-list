import { useAtom } from "jotai";
import { missionsAtom } from "../../atoms/MissionsAtom";
import MissionCard from "./MissionCard";
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import type { Mission } from "../../types";
import CardsList from "../generics/CardsList";

function MissionsList() {
    const [missionsList, setMissions] = useAtom(missionsAtom);
    const { loading, error, data, fetchApi } = useAxios<Mission[]>();
    if (data) {
        setMissions(data);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const id = user.id ? user.id : -1;
        fetchApi(`/missions?user_id=${id}`, "GET", {});
    }, []);
    return (
        <CardsList CardElement={MissionCard} dataList={missionsList} error={error} loading={loading} title="Missions List"/>
    );
}

export default MissionsList;
