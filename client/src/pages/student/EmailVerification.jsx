import { studentEmailVerification } from '@/redux/authSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const EmailVerification = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const token = params.token;
  const { isLoading } = useSelector((state) => state["auth"]);
  useEffect(() => {
    const verifyEmail = async () => {
      const response = await dispatch(studentEmailVerification({ token }))

      setMessage(response.payload.message)
    }
    verifyEmail();
  }, [])
  return (
    <div className='h-screen flex w-screen items-center justify-center'>
      {
        isLoading ? "Email verification in progress... " : message
      }
    </div>
  )
}

export default EmailVerification