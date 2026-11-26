import type { PropCard } from "./MissionCard";
import type { Mission } from "../../types";
import { useAxios } from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import type { GenericFormProps } from "../generics/GenericForm";
import GenericForm from "../generics/GenericForm";
import GenericFormCard from "../generics/GenericFormCard";

function UpdateMission({ item }: PropCard) {
    const { loading, error, fetchApi } = useAxios<Mission>();
    const feilds: GenericFormProps["feilds"] = [
        {
            feildName: "title",
            label: "Title",
            initialValue: item.title,
            type: "text",
        },
        {
            feildName: "desc",
            label: "Description",
            initialValue: item.desc,
            type: "textarea",
        },
        {
            feildName: "date",
            label: "To be completed by",
            initialValue: new Date(item.date)
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
