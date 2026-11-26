import { Alert, Button, Center, Flex, Loader, NumberInput, PasswordInput, Textarea, TextInput } from "@mantine/core";
import { MaskedDateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface Feild {
    feildName: string;
    label: string;
    placeHolder?: string;
    initialValue: any;
    type: "text" | "password" | "number" | "date" | "textarea" | "email"
}

export interface GenericFormProps {
    feilds: Feild[];
    buttonTitle: string;
    onSubmit: (values: any) => void | Promise<any>;
    loading: boolean,
    error: string | null,
    successMessage?: string 
}


function GenericForm({ feilds, buttonTitle, onSubmit, loading, error, successMessage }: GenericFormProps) {
    const [successMsg, setSuccessMsg] = useState("")
    const initialValues: {[key: string]: any} = {}
    feilds.forEach(f => {
        const {feildName, initialValue} = f
        initialValues[feildName] = initialValue
    })
    const form = useForm({
        initialValues: initialValues,
    })
    return (
        <form onSubmit={form.onSubmit(async (values) => {
            await onSubmit(values)
            if (successMessage) {
                setSuccessMsg(successMessage)
            }
            })}>
            <Flex direction={"column"} gap={"lg"} justify={"center"}>

            {feilds.map(f => {
                switch (f.type){
                    case "text":
                        return <TextInput label={f.label} key={f.feildName} placeholder={f.placeHolder} {...form.getInputProps(f.feildName)}/>
                    case "email":
                        return <TextInput label={f.label} type="email" key={f.feildName} placeholder={f.placeHolder} {...form.getInputProps(f.feildName)}/>
                    case "password":
                        return <PasswordInput label={f.label} key={f.feildName} placeholder={f.placeHolder} {...form.getInputProps(f.feildName)}/>
                    case "number":
                        return <NumberInput label={f.label} key={f.feildName} placeholder={f.placeHolder} {...form.getInputProps(f.feildName)}/>
                    case "date":
                        return <MaskedDateInput clearable key={f.feildName} withDropdown={false} label={f.label} {...form.getInputProps(f.feildName)}/>
                    case "textarea":
                        return <Textarea label={f.label} key={f.feildName} placeholder={f.placeHolder} rows={4} {...form.getInputProps(f.feildName)}/>
                    }
            })}
            <Center>
            {

            loading ?
                <Loader /> : 
                error ? <Alert color="red">{error}</Alert> :
                successMsg && <Alert color="green">{successMsg}</Alert>
            }
            </Center>
            <Button type="submit">{buttonTitle}</Button>
            </Flex>
        </form>
    )
}

export default GenericForm;
