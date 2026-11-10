import {
    TextInput,
    PasswordInput,
    Button,
    Title,
    Paper,
    Stack,
    Loader,
    Alert,
    Center,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import type { User } from "../../types";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useAxios } from "../../hooks/useAxios";

function Register({ onSuccess }: { onSuccess: () => void }) {
    const { loading, error, exec } = useAxios<User>();
    const setUser = useSetAtom(UserAtom);
    const form = useForm<User>({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    async function handleRegister(values: User) {
        const data = await exec("/users", "POST", values)
        if (data) {
            const new_user = {
            id: data.id,
            name: data.name,
            email: data.email
        }

            setUser(new_user);
            localStorage.setItem("user", JSON.stringify(new_user))
            onSuccess();
        }
    }

    return (
        <>
            <Paper
                shadow="md"
                p={"lg"}
                radius={"md"}
                w={400}
                mt={20}
                withBorder
                bg={"#bbddff"}
            >
                <Title order={2}>Register</Title>
                <form onSubmit={form.onSubmit(handleRegister)}>
                    <Stack mt={"md"}>
                        <TextInput
                            placeholder="Enter your name"
                            label="name"
                            {...form.getInputProps("name")}
                        />
                        <TextInput
                            label="email"
                            placeholder="Enter your email address"
                            type="email"
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label="password"
                            placeholder="Enter your password"
                            {...form.getInputProps("password")}
                        />
                        <Button fullWidth type="submit" disabled={loading}>
                            Register
                        </Button>
                        {loading && <Center><Loader /></Center>}
                        {error && <Alert color="red">{error}</Alert>}
                    </Stack>
                </form>
            </Paper>
        </>
    );
}

export default Register;
