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

interface valuesProp {
    title: string;
    desc: string;
    date: string | Date;
    user_id?: number;
    is_finished?: false
}

function NewMissionForm() {
    const { loading, error, data, exec } = useAxios();
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
        values.is_finished = false
        exec("/missions", "POST", values);
    }
    return (
        <>
            <Center h={"88vh"}>
                <Card w={400} bg={"#ccddff"} withBorder bd={"1px solid gray"} shadow="md">

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap={"lg"}>
                        <Title>New Mission</Title>
                        <TextInput
                            label="Title"
                            placeholder="enter mission's title"
                            {...form.getInputProps("title")}
                            />
                        <Textarea
                            label="Description"
                            rows={4}
                            placeholder="describe the mission"
                            {...form.getInputProps("desc")}
                            />
                        <MaskedDateInput
                            label="To be completed by"
                            withDropdown={false}
                            clearable
                            size="md"
                            {...form.getInputProps("date")}
                            />
                        <Button type="submit">Send</Button>
                    </Stack>
                    </form>
                    {loading ? (
                        <Loader />
                    ) : data ? (
                        <Alert color="green">
                            The mission created successfully
                        </Alert>
                    ) : (
                        error && <Alert color="red">{error}</Alert>
                    )}
                </Card>
            </Center>
        </>
    );
}

export default NewMissionForm;
