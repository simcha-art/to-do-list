import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { Center } from '@mantine/core'

function LoginPage() {
  const navigate = useNavigate()
  return (
    <Center h={"100vh"}>

      <LoginForm onSuccess={() => navigate("/user-details")}/>
    </Center>
  )
}

export default LoginPage