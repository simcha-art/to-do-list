import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserAtom } from "../atoms/UserAtom";
import { useSetAtom } from "jotai";
import type { User, UserWithMission } from "../types";
import { getUserByEmailAndPwd } from "../api/api";
import { missionsAtom } from "../atoms/MissionsAtom";

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const setUser = useSetAtom(UserAtom);
    const setMissions = useSetAtom(missionsAtom)
    const form = useForm<User>({
        initialValues: {
            email: "",
            password: "",
        },
    });
    async function handleSubmit(values: User) {
        const data = await getUserByEmailAndPwd(values);
        const {id, name, email, missions} = data as UserWithMission

        setMissions(missions)
        setUser({id, name, email});
        onSuccess();
    }

    return (
        <>
            <Paper
                withBorder
                bd={"lightgray 1px solid"}
                shadow="md"
                bg={"#bbddff"}
                p={"lg"}
            >
                <Title order={2} p={10}>
                    Login
                </Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Flex direction={"column"} justify={"center"} gap={20}>
                        <TextInput
                            label="Email"
                            placeholder="Enter your email address"
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            {...form.getInputProps("password")}
                        />
                        <Button type="submit">Send</Button>
                    </Flex>
                </form>
            </Paper>
        </>
    );
}

export default LoginForm;
