import {  Button} from "@mantine/core";
import { UserAtom } from "../../atoms/UserAtom";
import { useSetAtom } from "jotai";
import type { User, UserWithMission } from "../../types";
import { missionsAtom } from "../../atoms/MissionsAtom";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import GenericForm, { type GenericFormProps } from "../GenericForm";
import GenericFormCard from "../GenericFormCard";

function LoginForm_v2({ onSuccess }: { onSuccess: () => void }) {
    const feilds: GenericFormProps["feilds"] = [
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
            placeHolder: "Enter your password",
            type: "password",
        },
    ];
    const navigate = useNavigate();
    const { loading, error, fetchApi } = useAxios<UserWithMission>();
    const setUser = useSetAtom(UserAtom);
    const setMissions = useSetAtom(missionsAtom);
    async function handleSubmit(values: User) {
        const data = await fetchApi("/users/login", "POST", values);
        if (data) {
            const { id, name, email, missions } = data;

            setMissions(missions);
            setUser({ id, name, email });
            localStorage.setItem("user", JSON.stringify({ id, name, email }));
            onSuccess();
        }
    }

    const form = (
        <GenericForm
            loading={loading}
            error={error}
            feilds={feilds}
            buttonTitle="Login"
            onSubmit={handleSubmit}
        />
    );
    const addButton = (
        <Button onClick={() => navigate("/register")}>
            Move to registration
        </Button>
    );

    return (
        <GenericFormCard height={"80vh"} form={form} title="Login" addButton={addButton}/>
    );
}

export default LoginForm_v2;
