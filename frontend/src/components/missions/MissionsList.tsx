import { Alert, Center, Grid, Loader, Stack, Title } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { missionsAtom } from "../../atoms/MissionsAtom";
import MissionCard from "./MissionCard";
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import type { Mission } from "../../types";

function MissionsList() {
    const [missionsList, setMissions] = useAtom(missionsAtom);
    const { loading, error, data, exec } = useAxios<Mission[]>();
    if (data) {
        setMissions(data);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const id = user.id ? user.id : -1;
        exec(`/missions?user_id=${id}`, "GET", {});
    }, []);
    return (
        <>
            <Title order={2} p={"1rem"} size={"2rem"}>
                Missions List
            </Title>
            <Center>
                {loading ? (
                    <Loader />
                ) : missionsList ? (
                    <Stack>
                        {missionsList.map((m) => (
                            <MissionCard mission={m} key={m.id} />
                        ))}
                    </Stack>
                ) : (
                    error && <Alert color="red">{error}</Alert>
                )}
            </Center>
        </>
    );
}

export default MissionsList;
