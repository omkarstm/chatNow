import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser)

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
    
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?  <HomePage />: <Navigate to={'/login'} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to={'/'} /> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/setting" element={authUser ? <SettingPage /> : <Navigate to={'/login'} />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={'/login'} />} />
      </Routes>

      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  )
}

export default App
