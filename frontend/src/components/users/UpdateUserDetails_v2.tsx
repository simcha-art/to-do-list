import {
    Button,
} from "@mantine/core";
import type { UserCardProps } from "./UserDetailsCard";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useAxios } from "../../hooks/useAxios";
import type { GenericFormProps } from "../GenericForm";
import GenericForm from "../GenericForm";
import GenericFormCard from "../GenericFormCard";

interface User {
    name?: string;
    email?: string;
    password?: string;
}

function UpdateUserDetails_v2({ user, toggle }: UserCardProps) {
    const { error, loading, fetchApi } = useAxios<User>();
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
            type: "email",
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
            const updatedUser = await fetchApi(`/users/${user.id}`, "PUT", values);
            if (updatedUser) {
                setUser(updatedUser);
                toggle();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const form = (
        <GenericForm
            feilds={feilds}
            error={error}
            loading={loading}
            buttonTitle="Update"
            onSubmit={handleSubmit}
            successMessage="User updated successfully"
        />
    );
    const addButton = <Button onClick={toggle}>Cancel</Button>;

    return (
            <GenericFormCard
                title="Update user details"
                form={form}
                addButton={addButton}
            />
    );
}

export default UpdateUserDetails_v2;
