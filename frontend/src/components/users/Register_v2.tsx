import {
    Title,
    Paper,
} from "@mantine/core";

import type { User } from "../../types";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useAxios } from "../../hooks/useAxios";
import type { GenericFormProps } from "../GenericForm";
import GenericForm from "../GenericForm";

function Register_v2({ onSuccess }: { onSuccess: () => void }) {
    const feilds: GenericFormProps["feilds"] = [
        {feildName: "name", initialValue: "", label: "Name", placeHolder: "Enter your name", type: "text"},
        {feildName: "email", initialValue: "", label: "Email", placeHolder: "Enter your email address", type: "text"},
        {feildName: "password", initialValue: "", label: "Password", placeHolder: "Enter password", type: "password"}
    ]
    const { loading, error, exec } = useAxios<User>();
    const setUser = useSetAtom(UserAtom);
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
                <Title order={2} mb={"lg"}>Register</Title>
                <GenericForm feilds={feilds} buttonTitle="Register" error={error} loading={loading} onSubmit={handleRegister} />
            </Paper>
        </>
    );
}

export default Register_v2;
