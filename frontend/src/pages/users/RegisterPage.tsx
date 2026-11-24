import { Center } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import Register_v2 from '../../components/users/Register_v2'

function RegisterPage() {
  const navigate = useNavigate()
  function onSuccess() {
    navigate(`/missions-list`)
  }
  return (
    <>
    <Center h={"80vh"}>
      <Register_v2 onSuccess={onSuccess}/>
    </Center>
    </>
  )
}

export default RegisterPage