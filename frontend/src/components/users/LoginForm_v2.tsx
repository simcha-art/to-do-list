import { Paper, Button, Title, Flex } from "@mantine/core";
import { UserAtom } from "../../atoms/UserAtom";
import { useSetAtom } from "jotai";
import type { User, UserWithMission } from "../../types";
import { missionsAtom } from "../../atoms/MissionsAtom";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import GenericForm, { type GenericFormProps } from "../GenericForm";

function LoginForm_v2({ onSuccess }: { onSuccess: () => void }) {
    const feilds: GenericFormProps["feilds"] = [
        {
            feildName: "email",
            initialValue: "",
            label: "Email",
            placeHolder: "Enter your email address",
            type: "text",
        },
        {
            feildName: "password",
            initialValue: "",
            label: "Password",
            placeHolder: "Enter your password",
            type: "password",
        },
    ];
    const navigate = useNavigate();
    const { loading, error, exec } = useAxios<UserWithMission>();
    const setUser = useSetAtom(UserAtom);
    const setMissions = useSetAtom(missionsAtom);
    async function handleSubmit(values: User) {
        const data = await exec("/users/login", "POST", values);
        if (data) {
            const { id, name, email, missions } = data;

            setMissions(missions);
            setUser({ id, name, email });
            localStorage.setItem("user", JSON.stringify({ id, name, email }));
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
                <Flex direction={"column"} gap={"lg"} justify={"center"}>
                    <Title order={2} p={10}>
                        Login
                    </Title>
                    <GenericForm
                        loading={loading}
                        error={error}
                        feilds={feilds}
                        buttonTitle="Login"
                        onSubmit={handleSubmit}
                    />
                    <Button onClick={() => navigate("/register")}>
                        Move to registration
                    </Button>
                </Flex>
            </Paper>
        </>
    );
}

export default LoginForm_v2;
