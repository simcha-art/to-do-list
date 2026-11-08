import { Center, Card, Title, Text, Divider, Flex, Button } from "@mantine/core";
import type { User } from "../../types";
export interface UserCardProps {
    user: User,
    toggle: () => void
}

function UserDetailsCard({user, toggle} : UserCardProps) {
    
        return (
            <Center mih="100vh" bg="#f1f5f9" p="md">
                <Card
                    withBorder
                    radius="lg"
                    shadow="md"
                    w="100%"
                    maw={440}
                >
                    <Card.Section
                        style={{
                            background: "linear-gradient(135deg, #0891b2, #2563eb)",
                            color: "white",
                        }}
                    >
                        <Flex justify={"center"} align={"center"} h={90}>
                            <Title order={2} c="white">
                                User details
                            </Title>
                        </Flex>
                    </Card.Section>
    
                    <Flex
                        p="lg"
                        gap="md"
                        direction={"row"}
                        justify="space-between"
                    >
                        <Flex
                            flex={1}
                            direction={"column"}
                            justify={"center"}
                            align={"center"}
                            gap={5}
                        >
                            <Text size="sm" c="dimmed" fw={500}>
                                Your name
                            </Text>
                            <Text size="md" fw={500}>
                                {user.name}
                            </Text>
                        </Flex>
    
                        <Divider orientation="vertical" />
    
                        <Flex
                            flex={1}
                            direction={"column"}
                            justify={"center"}
                            align={"center"}
                            gap={5}
                        >
                            <Text size="sm" c="dimmed" fw={500}>
                                Email address
                            </Text>
                            <Text size="md" fw={500} >
                                {user.email}
                            </Text>
                        </Flex>
                    </Flex>
    
                    <Button  bg={"#ffaa00"} onClick={toggle}>Update user details</Button>
                </Card>
            </Center>
        );
    }
    
    


export default UserDetailsCard