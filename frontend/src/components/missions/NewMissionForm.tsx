import {
    Alert,
    Button,
    Card,
    Center,
    Loader,
    Stack,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { useAxios } from "../../hooks/useAxios";
import { MaskedDateInput } from "@mantine/dates";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import { useForm } from "@mantine/form";
import GenericForm, { type GenericFormProps } from "../GenericForm";

interface valuesProp {
    title: string;
    desc: string;
    date: string | Date;
    user_id?: number;
    is_finished?: false;
}

function NewMissionForm() {
    const { loading, error, data, exec } = useAxios();
    const feilds: GenericFormProps["feilds"] = [
        {
            feildName: "title",
            initialValue: "",
            label: "Title",
            type: "text",
            placeHolder: "Enter mission's title",
        },
        {
            feildName: "desc",
            initialValue: "",
            label: "Description",
            type: "textarea",
            placeHolder: "Describe the mission",
        },
        {
            feildName: "date",
            initialValue: "",
            label: "To be completed by",
            type: "date",
            placeHolder: "Describe the mission",
        },
    ];
    const user_id = useAtomValue(UserAtom).id;
    const form = useForm({
        initialValues: {
            title: "",
            desc: "",
            date: "",
        },
    });
    function handleSubmit(values: valuesProp) {
        values.user_id = user_id;
        values.is_finished = false;
        exec("/missions", "POST", values);
    }
    return (
        <>
            <Center h={"88vh"}>
                <Card
                    w={400}
                    bg={"#dddddd"}
                    withBorder
                    bd={"1px solid gray"}
                    shadow="md"
                >
                    <Title>New Mission</Title>
                    <GenericForm
                        feilds={feilds}
                        buttonTitle="Send"
                        error={error}
                        loading={loading}
                        onSubmit={handleSubmit}
                        successMessage="The mission added successfully"
                    />
                </Card>
            </Center>
        </>
    );
}

export default NewMissionForm;
