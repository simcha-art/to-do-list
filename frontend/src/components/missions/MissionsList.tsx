import { Center, Grid, Stack, Title } from "@mantine/core";
import { useAtomValue } from "jotai";
import { missionsAtom } from "../../atoms/MissionsAtom";
import MissionCard from "./MissionCard";

function MissionsList() {
    const missionsList = useAtomValue(missionsAtom);
    return (
        <>
            <Title order={2} p={"1rem"} size={"2rem"}>Missions List</Title>
            <Center>
                <Stack>
                    {missionsList.map((m) => (
                        <MissionCard mission={m} key={m.id} />
                    ))}
                </Stack>
            </Center>
        </>
    );
}

export default MissionsList;
