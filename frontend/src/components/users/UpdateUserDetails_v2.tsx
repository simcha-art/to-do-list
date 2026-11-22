import {
    Center,
    Card,
    Title,
    TextInput,
    Divider,
    Flex,
    Button,
    Loader,
    Alert,
    Box,
} from "@mantine/core";
import type { UserCardProps } from "./UserDetailsCard";
import { useForm } from "@mantine/form";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useAxios } from "../../hooks/useAxios";
import type { GenericFormProps } from "../GenericForm";
import GenericForm from "../GenericForm";

interface User {
    name?: string;
    email?: string;
    password?: string;
}

function UpdateUserDetails_v2({ user, toggle }: UserCardProps) {
    const { error, loading, exec } = useAxios<User>();
    const setUser = useSetAtom(UserAtom);
    const { name, email } = user;
    const feilds: GenericFormProps["feilds"] = [
        {
            feildName: "name",
            initialValue: name,
            label: "Name",
            type: "text",
            placeHolder: "Enter updated name",
        },
        {
            feildName: "email",
            initialValue: email,
            label: "Email",
            type: "text",
            placeHolder: "Enter updated email address",
        },
        {
            feildName: "password",
            initialValue: "",
            label: "Password",
            type: "password",
            placeHolder: "Enter updated password",
        },
    ];
    async function handleSubmit(values: User) {
        try {
            values = Object.fromEntries(
                Object.entries(values).filter(([_key, value]) => value),
            );
            const updatedUser = await exec(`/users/${user.id}`, "PUT", values);
            if (updatedUser) {
                setUser(updatedUser);
                toggle();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Center mih="100vh">
            <Card withBorder radius="lg" shadow="md" w="100%" maw={440}>
                <Flex direction={"column"} gap={"lg"} justify={"center"}>
                    <Title order={2}>
                        Update user details
                    </Title>
                    <GenericForm
                        feilds={feilds}
                        error={error}
                        loading={loading}
                        buttonTitle="Update"
                        onSubmit={handleSubmit}
                        successMessage="User updated successfully"
                    />
                    <Button onClick={toggle}>Cancel</Button>
                </Flex>
            </Card>
        </Center>
    );
}

export default UpdateUserDetails_v2;
