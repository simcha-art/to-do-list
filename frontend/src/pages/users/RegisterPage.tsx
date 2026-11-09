import { Center } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import Register from '../../components/users/Register'

function RegisterPage() {
  const navigate = useNavigate()
  function onSuccess() {
    navigate(`/missions-list`)
  }
  return (
    <>
    <Center>
      <Register onSuccess={onSuccess}/>
    </Center>
    </>
  )
}

export default RegisterPage