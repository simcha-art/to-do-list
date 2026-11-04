import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { UserAtom } from "../atoms/UserAtom";
import { useSetAtom } from "jotai";
import type { User } from "../types";



function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const setUser = useSetAtom(UserAtom);
    const form = useForm<User>({
        initialValues: {
            email: "",
            password: "",
        },
    });
    async function handleSubmit(values: User) {
        try {
            const response = await axios.post<{ data: User }>(
                "http://localhost:3000/users/login",
                values,
            );
            const user = response.data.data;
            setUser(user);
            onSuccess();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Paper withBorder bd={"lightgray 1px solid"} shadow="md" bg={"#bbddff"} p={"lg"}>
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
