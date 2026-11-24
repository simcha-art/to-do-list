import { Alert, Center, Loader } from "@mantine/core";
import UpdateMission from "../../components/missions/UpdateMission";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import type { Mission } from "../../types";
import { useEffect } from "react";

function UpdateMissionPage() {
    const { id } = useParams();
    const { loading, error, data: mission, exec } = useAxios<Mission>();
    useEffect(() => {
        exec(`/missions/${id}`, "GET", {});
    }, []);
    return (
        <>
            <Center h={"90vh"}>
                {loading ? (
                    <Loader />
                ) : mission ? (
                    <UpdateMission mission={mission} />
                ) : (
                    <Alert color="red">{error}</Alert>
                )}
            </Center>
        </>
    );
}

export default UpdateMissionPage;
