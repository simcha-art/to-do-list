import { useAxios } from "../../hooks/useAxios";
import { type Mission } from "../../types";
import {
    Alert,
    Button,
    Card,
    Flex,
    Loader,
    Paper,
    Stack,
    Text,
    Title,
    Divider,
    Box,
    Center,
} from "@mantine/core";
import type { PropCard } from "./MissionCard";
import { useNavigate } from "react-router-dom";

function DetailedMission({ mission: initialMission }: PropCard) {
    const { loading, error, data, exec } = useAxios<Mission>();
    const navigate = useNavigate()
    const mission = data || initialMission;
    function toggleFinished() {
        console.log("toggling");
        exec(`/missions/${mission.id}`, "PUT", {
            is_finished: !mission.is_finished,
        });
        mission.is_finished = !mission.is_finished;
    }

    return (
        <>
            {mission ? (
                <Card w={600} withBorder bd={"2px solid gray"}>
                    <Card.Section bg={"#118AB2"} p={10}>
                        <Title order={1}>{mission.title}</Title>
                    </Card.Section>
                    <Card.Section
                        bg={mission.is_finished ? "#7CD5C7" : "#F2F2ED"}
                        p={10}
                        flex={1}
                    >
                        <Flex direction={"row"} align={"stretch"}>
                            <Box
                                flex={1}
                                style={{display: "flex", flexDirection: "column"}}
                            >
                                <Title order={3} td={"underline"} mb={10}>
                                    Description
                                </Title>
                                <Center flex={1}>

                                <p>{mission.desc}</p>
                                </Center>
                            </Box>

                            <Divider orientation="vertical"/>

                            <Box
                                flex={1}
                            >
                                <Title order={3} td={"underline"} mb={10}>
                                    Dates
                                </Title>

                                <Paper bg={"inherit"}>
                                    <Stack gap={4} p={10}>
                                        <Text ta={"center"}>
                                            Created at:{" "}
                                            {new Date(
                                                mission.created_at,
                                            ).toLocaleDateString("he-IL")}
                                        </Text>
                                        <Text ta={"center"}>
                                            End by:{" "}
                                            {new Date(
                                                mission.date,
                                            ).toLocaleDateString("he-IL")}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Flex>

                        <Flex
                            bg={mission.is_finished ? "#7CD5C7" : "#F2F2ED"}
                            p={10}
                            gap={30}
                        >
                            <Button
                            flex={1}
                                color={
                                    mission.is_finished ? "#F2F2ED" : "#7CD5C7"
                                }
                                onClick={toggleFinished}
                                c={mission.is_finished ? "#118AB2": "white"}
                            >
                                {mission.is_finished
                                    ? "Change to Active"
                                    : "Change to Done"}
                            </Button>
                            <Button
                            flex={1}
                                color="#118AB2"
                                onClick={() => navigate(`/update-mission/${mission.id}`)}
                            >
                                update mission details
                            </Button>
                        </Flex>
                    </Card.Section>
                </Card>
            ) : loading ? (
                <Loader />
            ) : (
                error && <Alert>{error}</Alert>
            )}
        </>
    );
}

export default DetailedMission;
