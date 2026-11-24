import { useAxios } from "../../hooks/useAxios";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/UserAtom";
import GenericForm, { type GenericFormProps } from "../GenericForm";
import GenericFormCard from "../GenericFormCard";

interface valuesProp {
    title: string;
    desc: string;
    date: string | Date;
    user_id?: number;
    is_finished?: false;
}

function NewMissionForm() {
    const { loading, error, exec } = useAxios();
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
    function handleSubmit(values: valuesProp) {
        values.user_id = user_id;
        values.is_finished = false;
        exec("/missions", "POST", values);
    }
    return (
        <>
                <GenericFormCard
                    title="New Mission"
                    form={
                        <GenericForm
                            feilds={feilds}
                            buttonTitle="Send"
                            error={error}
                            loading={loading}
                            onSubmit={handleSubmit}
                            successMessage="The mission added successfully"
                        />
                    }
                />
        </>
    );
}

export default NewMissionForm;
