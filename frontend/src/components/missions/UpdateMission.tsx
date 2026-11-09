import { Alert, Button, Card, Loader, Stack, Textarea, TextInput, Title } from "@mantine/core"
import type {PropCard} from "./MissionCard"
import { useForm } from "@mantine/form"
import type { Mission } from "../../types"
import { useAxios } from "../../hooks/useAxios"
import { useParams } from "react-router-dom"

function UpdateMission({mission}: PropCard) {
  const {loading, error, data: success, exec} = useAxios<Mission>()
  const {id} = useParams()
  const form = useForm({
    initialValues: {
      title: mission.title,
      desc: mission.desc,
      date: new Date(mission.date).toISOString().split("T")[0].split("-").reverse().join("-")
    }
  })
  function handleSubmit(values: Pick<Mission, "title" | "desc" | "date">) {
    const body = {...values, date: values.date.toString().split("-").reverse().join("-")}
    exec(`/missions/${id}`, "PUT", body)

  }
  return (
    <>
    <Card withBorder bg={"#dddddd"} bd={"1px solid gray"} p={"lg"} shadow="md">

    <Title p={"lg"}> Update Mission Details</Title>
    <form onSubmit={form.onSubmit(handleSubmit)}>
    <Stack gap={"md"}>

    <TextInput label="Title" {...form.getInputProps('title')}/>
    <Textarea label="Description" rows={5} {...form.getInputProps('desc')}/>
    <TextInput label="Date" {...form.getInputProps('date')}/>
    <Button type="submit">send</Button>
    {loading ? <Loader /> :  
    error ? <Alert color="red">{error}</Alert>:
    success && <Alert color="green">The mission updated successfully</Alert>}
    </Stack>
    </form>

    </Card>
    </>
  )
}

export default UpdateMission