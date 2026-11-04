import {
    Center,
    Card,
    Title,
    TextInput,
    Divider,
    Flex,
    Button,
} from "@mantine/core";
import type { UserCardProps } from "./UserDetailsCard";
import { useForm } from "@mantine/form";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import axios from "axios";

interface User {
    name?: string;
    email?: string;
    password?: string;
}

function UpdateUserDetails({ user, toggle }: UserCardProps) {
    const setUser = useSetAtom(UserAtom);
    const { name, email } = user;
    const form = useForm<User>({
        initialValues: {
            name,
            email,
            password: "",
        },
    });
    async function handleSubmit(values: User) {
        try {
            values = Object.fromEntries(
                Object.entries(values).filter(([_key, value]) => value),
            );
            console.log(values);
            const response = await axios.put(
                `http://localhost:3000/users/${user.id}`,
                values,
            );
            const updated_user = response.data.data;
            setUser(updated_user);
            toggle();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Center mih="100vh" bg="#f1f5f9" p="md">
            <Card withBorder radius="lg" shadow="md" w="100%" maw={440}>
                <Card.Section
                    style={{
                        background: "linear-gradient(135deg, #0891b2, #2563eb)",
                        color: "white",
                    }}
                >
                    <Flex justify={"center"} align={"center"} h={90}>
                        <Title order={2} c="white">
                            Update user details
                        </Title>
                    </Flex>
                </Card.Section>
                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                            <TextInput
                                size="sm"
                                c="dimmed"
                                fw={500}
                                label="Your name"
                                {...form.getInputProps("name")}
                            />
                        </Flex>

                        <Divider orientation="vertical" />

                        <Flex
                            flex={1}
                            direction={"column"}
                            justify={"center"}
                            align={"center"}
                            gap={5}
                        >
                            <TextInput
                                size="sm"
                                c="dimmed"
                                fw={500}
                                label="Email address"
                                {...form.getInputProps("email")}
                            />
                        </Flex>
                        <Divider orientation="vertical" />

                        <Flex
                            flex={1}
                            direction={"column"}
                            justify={"center"}
                            align={"center"}
                            gap={5}
                        >
                            <TextInput
                                size="sm"
                                c="dimmed"
                                fw={500}
                                label="Password"
                                {...form.getInputProps("password")}
                            />
                        </Flex>
                    </Flex>
                    <Flex justify={"space-evenly"} gap={"md"}>
                        <Button type="submit" bg={"#ffaa00"} flex={1}>
                            Update
                        </Button>
                        <Button onClick={toggle} flex={1}>
                            Cancel
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Center>
    );
}

export default UpdateUserDetails;
