import { Center } from '@mantine/core'
import Register from '../components/Register'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  function onSuccess() {
    navigate(`/user-details`)
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