import { Badge, Button, Card, Flex, Stack, Title } from "@mantine/core";
import type { Mission } from "../../types";
import { useNavigate } from "react-router-dom";

export interface PropCard {
    mission: Mission;
}

function MissionCard({ mission }: PropCard) {
    const navigate = useNavigate();
    const shortDate = new Date(mission.date).toLocaleDateString("he-IL")
    return (
        <Card
            bg={"#ccddff"}
            radius={"md"}
            p={10}
            withBorder
            bd={"2px solid gray"}
            w={"30vw"}
        >
                <Stack gap={"lg"}>
                <Flex
                    justify={"space-between"}
                    align={"center"}
                    bg={"#ccddff"}
                    gap={"lg"}
                >
                    <Badge radius={"md"}>{shortDate}</Badge>
                    <Badge
                        bg={mission.is_finished ? "green" : "gray"}
                        radius={"md"}   
                    >
                        {mission.is_finished ? "finished" : "active"}
                    </Badge>
                </Flex>
                    <Title order={2} fw={700} size={"1.8rem"}>{mission.title}</Title>
                    <Button
                        bg={"orange"}
                        onClick={() =>
                            navigate(`/mission-details/${mission.id}`)
                        }
                    >
                        Show details
                    </Button>
                </Stack>
        </Card>
    );
}

export default MissionCard;
