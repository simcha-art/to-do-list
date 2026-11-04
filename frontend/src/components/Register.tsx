import {
    TextInput,
    PasswordInput,
    Button,
    Title,
    Paper,
    Stack,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import axios from "axios";
import type { User } from "../../types";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";

interface RegisterValues {
    name: string;
    email: string;
    password: string;
}

function Register({ onSuccess }: { onSuccess: () => void }) {
    const setUser = useSetAtom(UserAtom);
    const form = useForm<RegisterValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    async function handleRegister(values: RegisterValues) {
        try {
            const response = await axios.post(
                "http://localhost:3000/users",
                values,
            );
            const new_user: User = response.data.data;
            setUser({
                id: new_user.id,
                name: new_user.name,
                email: new_user.email,
            });
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.log(error);
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
                        <Button fullWidth type="submit">
                            Register
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </>
    );
}

export default Register;
