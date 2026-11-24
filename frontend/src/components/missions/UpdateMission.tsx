import type { PropCard } from "./MissionCard";
import type { Mission } from "../../types";
import { useAxios } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import type { GenericFormProps } from "../GenericForm";
import GenericForm from "../GenericForm";
import GenericFormCard from "../GenericFormCard";

function UpdateMission({ mission }: PropCard) {
    const { loading, error, fetchApi } = useAxios<Mission>();
    const feilds: GenericFormProps["feilds"] = [
        {
            feildName: "title",
            label: "Title",
            initialValue: mission.title,
            type: "text",
        },
        {
            feildName: "desc",
            label: "Description",
            initialValue: mission.desc,
            type: "textarea",
        },
        {
            feildName: "date",
            label: "To be completed by",
            initialValue: new Date(mission.date)
                .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-"),
            type: "text",
        },
    ];
    const { id } = useParams();
    function handleSubmit(values: Pick<Mission, "title" | "desc" | "date">) {
        const body = {
            ...values,
            date: values.date.toString().split("-").reverse().join("-"),
        };
        fetchApi(`/missions/${id}`, "PUT", body);
    }
    return (
        <GenericFormCard
            title="Update Mission Details"
            form={
                <GenericForm
                    feilds={feilds}
                    error={error}
                    loading={loading}
                    buttonTitle="Send"
                    onSubmit={handleSubmit}
                    successMessage="The mission updated successfully"
                />
            }
        />
    );
}

export default UpdateMission;
