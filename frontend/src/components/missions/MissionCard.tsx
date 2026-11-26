import { Badge, Button, Flex, Stack, Title } from "@mantine/core";
import type { Mission } from "../../types";
import { useNavigate } from "react-router-dom";

export interface PropCard {
    item: Mission;
}

function MissionCard({ item }: PropCard) {
    const navigate = useNavigate();
    const shortDate = new Date(item.date).toLocaleDateString("he-IL");
    return (
        <Stack gap={"lg"}>
            <Flex
                justify={"space-between"}
                align={"center"}
                bg={"#ccddff"}
                gap={"lg"}
            >
                <Badge radius={"md"}>{shortDate}</Badge>
                <Badge bg={item.is_finished ? "green" : "gray"} radius={"md"}>
                    {item.is_finished ? "finished" : "active"}
                </Badge>
            </Flex>
            <Title order={2} fw={700} size={"1.8rem"}>
                {item.title}
            </Title>
            <Button
                bg={"orange"}
                onClick={() => navigate(`/mission-details/${item.id}`)}
            >
                Show details
            </Button>
        </Stack>
    );
}

export default MissionCard;
