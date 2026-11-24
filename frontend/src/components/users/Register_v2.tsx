
import type { User } from "../../types";
import { useSetAtom } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useAxios } from "../../hooks/useAxios";
import type { GenericFormProps } from "../GenericForm";
import GenericForm from "../GenericForm";
import GenericFormCard from "../GenericFormCard";

function Register_v2({ onSuccess }: { onSuccess: () => void }) {
    const feilds: GenericFormProps["feilds"] = [
        {
            feildName: "name",
            initialValue: "",
            label: "Name",
            placeHolder: "Enter your name",
            type: "text",
        },
        {
            feildName: "email",
            initialValue: "",
            label: "Email",
            placeHolder: "Enter your email address",
            type: "email",
        },
        {
            feildName: "password",
            initialValue: "",
            label: "Password",
            placeHolder: "Enter password",
            type: "password",
        },
    ];
    const { loading, error, fetchApi } = useAxios<{user: User, token: string}>();
    const setUser = useSetAtom(UserAtom);
    async function handleRegister(values: User) {
        const data = await fetchApi("/users", "POST", values);
        if (data) {
            const {user, token}  = data
            const new_user = {
                id: user.id,
                name: user.name,
                email: user.email,
            };

            setUser(new_user);
            localStorage.setItem("user", JSON.stringify(new_user));
            localStorage.setItem("token", token)
            onSuccess();
        }
    }

    return (
        <GenericFormCard
            title="Register"
            form={
                <GenericForm
                    feilds={feilds}
                    buttonTitle="Register"
                    error={error}
                    loading={loading}
                    onSubmit={handleRegister}
                />
            }
        />
    );
}

export default Register_v2;
