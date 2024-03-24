import LoginForm from '@/components/auth/LoginForm'
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const role = localStorage.getItem("role");
  if (role) {
    return <Navigate to={`/${role}`} replace />
  }
  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <LoginForm />
    </div>
  )
}

export default LoginPage