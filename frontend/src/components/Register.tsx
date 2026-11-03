import {
    TextInput,
    PasswordInput,
    Button,
    Title,
    Center,
    Paper,
    Stack,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import axios from "axios"
import type {User} from "../../types"
import { useNavigate } from "react-router-dom";

interface RegisterValues {
  name: string, 
  email: string, 
  password: string
}


function Register() {
  const navigate = useNavigate()
  const form = useForm<RegisterValues>({
    initialValues: {
      name: "",
      email: "",
      password: ""

    }
  })
  async function handleRegister(values: RegisterValues) {
    try {
      const response = await axios.post("http://localhost:3000/users", values)
      const new_user: User = response.data.data
      navigate(`/user-details/${new_user.id}`)
      
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <>
            <Center>
                <Paper
                    shadow="md"
                    p={"lg"}
                    radius={"md"}
                    w={400}
                    mt={20}
                    withBorder
                >
                    <Title order={2}>Register</Title>
                    <form onSubmit={form.onSubmit(handleRegister)}>
                        <Stack mt={"md"}>
                            <TextInput
                                placeholder="Enter your name"
                                label="name"
                                {...form.getInputProps("name")}
                            />
                            <TextInput
                                label="email"
                                placeholder="Enter your email address"
                                type="email"
                                {...form.getInputProps("email")}
                            />
                            <PasswordInput
                                label="password"
                                placeholder="Enter your password"
                                {...form.getInputProps("password")}
                            />
                            <Button fullWidth type="submit">
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Center>
        </>
    );
}

export default Register;
