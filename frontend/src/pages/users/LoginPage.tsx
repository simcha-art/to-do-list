import { useNavigate } from 'react-router-dom'
import { Center } from '@mantine/core'
import LoginForm_v2 from '../../components/users/LoginForm_v2'

function LoginPage() {
  const navigate = useNavigate()
  return (
    <Center h={"80vh"}>
      
      <LoginForm_v2 onSuccess={() => navigate("/missions-list")}/>
    </Center>
  )
}

export default LoginPage