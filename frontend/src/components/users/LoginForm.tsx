import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Flex,
    Loader,
    Alert,
    Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserAtom } from "../../atoms/UserAtom";
import { useSetAtom } from "jotai";
import type { User, UserWithMission } from "../../types";
import { missionsAtom } from "../../atoms/MissionsAtom";
import { useAxios } from "../../hooks/useAxios";

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const { loading, error, exec } = useAxios<UserWithMission>();
    const setUser = useSetAtom(UserAtom);
    const setMissions = useSetAtom(missionsAtom);
    const form = useForm<User>({
        initialValues: {
            email: "",
            password: "",
        },
    });
    async function handleSubmit(values: User) {
        const data = await exec("/users/login", "POST", values);
        if (data) {
            const { id, name, email, missions } = data;

            setMissions(missions);
            setUser({ id, name, email });
            onSuccess();
        }
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
                        <Button type="submit" disabled={loading}>
                            Send
                        </Button>
                        <Center>
                            {loading && <Loader />}
                            {error && <Alert color="red">{error}</Alert>}
                        </Center>
                    </Flex>
                </form>
            </Paper>
        </>
    );
}

export default LoginForm;
