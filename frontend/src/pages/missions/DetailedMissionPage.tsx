import { useEffect } from "react";
import DetailedMission from "../../components/missions/DetailedMission";
import { useAxios } from "../../hooks/useAxios";
import type { Mission } from "../../types";
import { Alert, Center, Loader } from "@mantine/core";
import { useParams } from "react-router-dom";

function DetailedMissionPage() {
    const { loading, error, data: mission, exec } = useAxios<Mission>();
    const { id } = useParams();
    useEffect(() => {
        exec(`/missions/${id}`, "GET", {});
    }, []);

    return (
        <>
        <Center h={"80vh"}>

            {mission ? (
                <DetailedMission mission={mission} />
            ) : loading ? (
                <Loader />
            ) : (
                <Alert>{error}</Alert>
            )}
            </Center>
        </>
    );
}

export default DetailedMissionPage;
