import {
    Button,
} from "@mantine/core";
import type { UserCardProps } from "./UserDetailsCard";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useAxios } from "../../hooks/useAxios";
import type { GenericFormProps } from "../generics/GenericForm";
import GenericForm from "../generics/GenericForm";
import GenericFormCard from "../generics/GenericFormCard";
import type { User } from "../../types";


function UpdateUserDetails_v2({ user, toggle }: UserCardProps) {
    const { error, loading, fetchApi } = useAxios<{user: User, token: string}>();
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
            const data = await fetchApi(`/users/${user.id}`, "PUT", values);
            if (data) {
                let {user: updatedUser, token} = data
                const {id, name, email} = updatedUser
                updatedUser = {id, name, email}
                localStorage.setItem("user", JSON.stringify(updatedUser));
                localStorage.setItem("token", token)
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
